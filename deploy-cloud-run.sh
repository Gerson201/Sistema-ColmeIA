#!/bin/bash

# Script para deploy do backend no Google Cloud Run
# Execute: chmod +x deploy-cloud-run.sh && ./deploy-cloud-run.sh

echo "🚀 Iniciando deploy do backend no Google Cloud Run..."

# Configurações
PROJECT_ID="colmeia-bfabc"  # Seu project ID do Firebase
SERVICE_NAME="sistema-colmeia-backend"
REGION="us-central1"

# Build e push da imagem
echo "📦 Construindo e enviando imagem Docker..."
gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE_NAME ./backend

# Deploy no Cloud Run
echo "🚀 Fazendo deploy no Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$SERVICE_NAME \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1 \
  --max-instances 10 \
  --set-env-vars DJANGO_DEBUG=False,DJANGO_ALLOWED_HOSTS="*",CORS_ALLOWED_ORIGINS="https://gerson201.github.io"

echo "✅ Deploy concluído!"
echo "🌐 URL do backend: https://$SERVICE_NAME-$REGION-$PROJECT_ID.a.run.app"
