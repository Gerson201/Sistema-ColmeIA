# Deploy do Backend no Google Cloud Run

## 🚀 Pré-requisitos

1. **Google Cloud CLI instalado**
   ```bash
   # Windows (PowerShell)
   (New-Object Net.WebClient).DownloadFile("https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe", "$env:Temp\GoogleCloudSDKInstaller.exe")
   & "$env:Temp\GoogleCloudSDKInstaller.exe"
   ```

2. **Autenticação no Google Cloud**
   ```bash
   gcloud auth login
   gcloud config set project colmeia-bfabc
   ```

3. **Habilitar APIs necessárias**
   ```bash
   gcloud services enable cloudbuild.googleapis.com
   gcloud services enable run.googleapis.com
   gcloud services enable containerregistry.googleapis.com
   ```

## 🛠️ Deploy Automático

### Opção 1: Script Automático
```bash
# Dar permissão de execução
chmod +x deploy-cloud-run.sh

# Executar deploy
./deploy-cloud-run.sh
```

### Opção 2: Deploy Manual

1. **Build da imagem Docker**
   ```bash
   gcloud builds submit --tag gcr.io/colmeia-bfabc/sistema-colmeia-backend ./backend
   ```

2. **Deploy no Cloud Run**
   ```bash
   gcloud run deploy sistema-colmeia-backend \
     --image gcr.io/colmeia-bfabc/sistema-colmeia-backend \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --port 8080 \
     --memory 512Mi \
     --cpu 1 \
     --max-instances 10 \
     --set-env-vars DJANGO_DEBUG=False,DJANGO_ALLOWED_HOSTS="*",CORS_ALLOWED_ORIGINS="https://gerson201.github.io"
   ```

## 🔧 Configuração do Frontend

Após o deploy, atualize a URL do backend no frontend:

1. **Editar `frontend/src/Login.js`**
   ```javascript
   const API_BASE_URL = 'https://sistema-colmeia-backend-us-central1-colmeia-bfabc.a.run.app';
   ```

2. **Fazer commit e push**
   ```bash
   git add .
   git commit -m "Atualizar URL do backend para Cloud Run"
   git push origin main
   ```

## ✅ Verificação

1. **Testar o backend**
   ```bash
   curl https://sistema-colmeia-backend-us-central1-colmeia-bfabc.a.run.app/api/data/
   ```

2. **Testar o frontend**
   - Acesse: https://gerson201.github.io/Sistema-ColmeIA
   - Faça login com: `admin` / `Admin@12345`

## 💰 Custos

- **Cloud Run**: Paga apenas quando há requisições
- **Cloud Build**: ~$0.003 por minuto de build
- **Container Registry**: ~$0.026 por GB/mês

**Estimativa mensal**: $5-15 (dependendo do uso)

## 🔄 Atualizações

Para atualizar o backend:
```bash
./deploy-cloud-run.sh
```

O Cloud Run irá automaticamente:
- Fazer build da nova imagem
- Fazer deploy da nova versão
- Manter a URL inalterada
