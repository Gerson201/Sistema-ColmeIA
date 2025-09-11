from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.conf import settings
import json
import firebase_admin
from firebase_admin import db
from datetime import datetime
import statistics

def parse_reading_string(reading_string):
    all_parsed_readings = []
    individual_reading_segments = reading_string.split('|')
    
    for segment in individual_reading_segments:
        if not segment.strip():
            continue

        parsed_reading = {}
        pairs = segment.split(';')
        for pair in pairs:
            parts = pair.split(':')
            if len(parts) == 2:
                key = parts[0].strip()
                value = parts[1].strip()
                
                if key and key[0].isalpha():
                    try:
                        parsed_reading[key] = float(value)
                    except ValueError:
                        parsed_reading[key] = value
            
        if parsed_reading:
            all_parsed_readings.append(parsed_reading)
            
    return all_parsed_readings[-1] if all_parsed_readings else {}

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    try:
        data = request.data
        username = data.get('username')
        password = data.get('password')
        if not username or not password:
            return Response({'status': 'error', 'message': 'Usuário e senha são obrigatórios'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)
        if not user:
            return Response({'status': 'error', 'message': 'Credenciais inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

        token, _ = Token.objects.get_or_create(user=user)
        return Response({'status': 'success', 'user': user.username, 'token': token.key}, status=status.HTTP_200_OK)
    except json.JSONDecodeError:
        return Response({'status': 'error', 'message': 'JSON inválido'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def data_view(request):
    try:
        # Inicializa o Firebase se não estiver inicializado
        if not firebase_admin._apps:
            import os
            from firebase_admin import credentials
            
            # Caminho para o arquivo de credenciais - primeiro tenta no diretório backend
            cred_path = os.path.join(os.path.dirname(__file__), '..', 'firebase-credentials.json')
            if not os.path.exists(cred_path):
                # Se não encontrar, tenta no diretório pai
                cred_path = os.path.join(os.path.dirname(__file__), '..', '..', 'firebase-credentials.json')
            
            if os.path.exists(cred_path):
                cred = credentials.Certificate(cred_path)
                firebase_admin.initialize_app(cred, {
                    'databaseURL': 'https://colmeia-bfabc-default-rtdb.firebaseio.com/'
                })
            else:
                return Response({'error': 'Arquivo de credenciais do Firebase não encontrado.'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        
        ref = db.reference('leituras_esp32')
        firebase_data = ref.order_by_key().get()

        if not firebase_data:
            return Response({'error': 'Nenhum dado encontrado no Firebase.'}, status=status.HTTP_404_NOT_FOUND)

        sorted_data = dict(sorted(firebase_data.items()))
        return Response({"leituras_esp32": sorted_data}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': f'Erro interno do servidor: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def historical_data_view(request):
    variable_name = request.query_params.get('variable')
    if not variable_name:
        return Response({'error': 'Parâmetro "variable" é obrigatório.'}, status=status.HTTP_400_BAD_REQUEST)

    def get_sort_key(entry):
        ts = entry.get('timestamp')
        if isinstance(ts, (int, float)):
            return ts
        if isinstance(ts, str):
            try:
                return datetime.strptime(ts, '%Y-%m-%d %H:%M:%S').timestamp()
            except ValueError:
                return 0
        return 0

    try:
        # Inicializa o Firebase se não estiver inicializado
        if not firebase_admin._apps:
            import os
            from firebase_admin import credentials
            
            # Caminho para o arquivo de credenciais - primeiro tenta no diretório backend
            cred_path = os.path.join(os.path.dirname(__file__), '..', 'firebase-credentials.json')
            if not os.path.exists(cred_path):
                # Se não encontrar, tenta no diretório pai
                cred_path = os.path.join(os.path.dirname(__file__), '..', '..', 'firebase-credentials.json')
            
            if os.path.exists(cred_path):
                cred = credentials.Certificate(cred_path)
                firebase_admin.initialize_app(cred, {
                    'databaseURL': 'https://colmeia-bfabc-default-rtdb.firebaseio.com/'
                })
            else:
                return Response({'error': 'Arquivo de credenciais do Firebase não encontrado.'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        ref = db.reference('leituras_esp32')
        firebase_data = ref.get()

        if not firebase_data:
            return Response([], status=status.HTTP_200_OK)

        # Step 1: Filter out entries without a valid timestamp and flatten all readings
        raw_data = []
        valid_entries = [
            entry for entry in firebase_data.values()
            if isinstance(entry, dict) and 'timestamp' in entry and isinstance(entry.get('leituras'), list)
        ]

        # Sort the valid entries by timestamp to process readings chronologically
        all_device_entries = sorted(valid_entries, key=get_sort_key)

        for device_data in all_device_entries:
            entry_timestamp = device_data['timestamp']
            for reading_string in device_data['leituras']:
                if not isinstance(reading_string, str):
                    continue
                
                parsed_reading = {}
                cleaned_string = reading_string.strip().strip('|')
                pairs = cleaned_string.split(';')
                for pair in pairs:
                    parts = pair.split(':')
                    if len(parts) == 2:
                        key = parts[0].strip()
                        value = parts[1].strip()
                        try:
                            parsed_reading[key] = float(value)
                        except (ValueError, TypeError):
                            continue
                
                if variable_name in parsed_reading:
                    raw_data.append({
                        'value': parsed_reading[variable_name],
                        'timestamp': entry_timestamp
                    })

        # Step 2: Process the flattened list in chunks
        chunk_size = 200
        processed_data = []
        for i in range(0, len(raw_data), chunk_size):
            chunk = raw_data[i:i + chunk_size]
            if chunk:
                # Get the timestamp of the last item in the chunk
                last_timestamp = chunk[-1]['timestamp']
                # Extract values for median calculation
                values_in_chunk = [item['value'] for item in chunk]
                median_value = statistics.median(values_in_chunk)

                # Convert timestamp to a readable label
                dt_object = None
                if isinstance(last_timestamp, (int, float)):
                    dt_object = datetime.fromtimestamp(last_timestamp)
                elif isinstance(last_timestamp, str):
                    try:
                        dt_object = datetime.strptime(last_timestamp, '%Y-%m-%d %H:%M:%S')
                    except ValueError:
                        dt_object = None # Or some other fallback

                if dt_object:
                    label = dt_object.strftime('%d/%m/%Y %H:%M')
                else:
                    label = f'Leituras {i + 1}-{i + len(chunk)}'
                
                processed_data.append({
                    'label': label,
                    'timestamp': str(last_timestamp),
                    'value': median_value
                })

        return Response(processed_data, status=status.HTTP_200_OK)

    except Exception as e:
        print(f"Erro ao buscar e processar dados do Firebase: {e}")
        return Response({'error': f'Erro interno do servidor: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
