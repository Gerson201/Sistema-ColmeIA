# Sistema ColmeIA - Monitoramento de Colmeias

Sistema completo para monitoramento de colmeias com dados em tempo real, incluindo temperatura e umidade interna/externa, peso, frequência acústica e magnitude sonora.

## 🚀 Deploy no GitHub Pages

### Pré-requisitos
- Conta no GitHub
- Node.js 18+ instalado
- Git configurado

### Passos para Deploy

1. **Fork ou Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/sistema-colmeia.git
   cd sistema-colmeia
   ```

2. **Configure o repositório no GitHub**
   - Vá em Settings > Pages
   - Selecione "GitHub Actions" como fonte

3. **Atualize a URL no package.json**
   ```json
   "homepage": "https://seu-usuario.github.io/sistema-colmeia"
   ```

4. **Faça push das alterações**
   ```bash
   git add .
   git commit -m "Deploy para GitHub Pages"
   git push origin main
   ```

5. **O deploy será automático!**
   - O GitHub Actions irá construir e fazer deploy automaticamente
   - Acesse: `https://seu-usuario.github.io/sistema-colmeia`

## 🏗️ Estrutura do Projeto

```
sistema-colmeia/
├── frontend/          # Aplicação React
├── backend/           # API Django
├── mobile/            # App React Native
├── .github/workflows/ # GitHub Actions
└── README.md
```

## 🔧 Configuração Local

### Frontend (React)
```bash
cd frontend
npm install
npm start
```

### Backend (Django)
```bash
cd backend
pip install -r requirements.txt
python manage.py runserver
```

## 📊 Funcionalidades

- **Dashboard em Tempo Real**: Monitoramento contínuo das condições da colmeia
- **Temperatura e Umidade**: Interna e externa com status colorido
- **Peso da Colmeia**: Monitoramento do peso
- **Análise Acústica**: Frequência e magnitude sonora
- **Gráficos Históricos**: Visualização de tendências
- **Sistema de Alertas**: Status baseado em valores ideais
- **Responsivo**: Funciona em desktop e mobile

## 🔥 Firebase

O sistema utiliza Firebase Realtime Database para armazenar os dados dos sensores.

### Estrutura de Dados
```
ID:10;TS:2025-09-10 21:45:20;Freq:1406.25;Mag:154.88;Temp1:25.9;Hum1:44.0;Peso:2.01;Temp2:26.7;Hum2:40.8
```

- **Temp1, Hum1**: Temperatura e Umidade Externa
- **Temp2, Hum2**: Temperatura e Umidade Interna
- **Freq**: Frequência Acústica
- **Mag**: Magnitude Acústica
- **Peso**: Peso da Colmeia

## 🎯 Status do Sistema

- ✅ Frontend React configurado
- ✅ Backend Django funcionando
- ✅ Firebase conectado
- ✅ Deploy automático configurado
- ✅ Responsivo para mobile
- ✅ Formatação consistente

## 📱 Acesso

- **Desenvolvimento**: http://localhost:3000
- **Produção**: https://gerson201.github.io/Sistema-ColmeIA

## 🔐 Credenciais de Teste

- **Admin**: admin / admin123
- **Visitante**: visitante / visitante

---

**Sistema ColmeIA v2.0** - Desenvolvido para monitoramento inteligente de colmeias 🐝