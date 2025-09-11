# 🚀 Instruções de Deploy - Sistema ColmeIA

## ✅ Arquivos Preparados para Deploy

Todos os arquivos necessários foram criados e configurados:

### 📁 Estrutura de Arquivos
```
Sistema-ColmeIA/
├── .github/workflows/deploy.yml    # GitHub Actions
├── frontend/package.json           # Configurado com homepage
├── backend/backend/settings.py     # CORS configurado
├── README.md                       # Documentação
├── .gitignore                      # Arquivos ignorados
└── DEPLOY_INSTRUCTIONS.md          # Este arquivo
```

## 🔧 Passos para Deploy

### 1. Upload dos Arquivos para GitHub
1. Acesse: https://github.com/Gerson201/Sistema-ColmeIA
2. Faça upload de todos os arquivos do projeto
3. Certifique-se de incluir:
   - ✅ Pasta `.github/workflows/`
   - ✅ Pasta `frontend/` completa
   - ✅ Pasta `backend/` completa
   - ✅ Arquivo `firebase-credentials.json`
   - ✅ Arquivo `.gitignore`

### 2. Configurar GitHub Pages
1. Vá em **Settings** do repositório
2. Role até **Pages** no menu lateral
3. Em **Source**, selecione **GitHub Actions**
4. Salve as configurações

### 3. Deploy Automático
- O GitHub Actions irá detectar o push
- Instalará as dependências
- Fará o build do React
- Deploy automático para GitHub Pages

## 🌐 URLs de Acesso

- **Desenvolvimento**: http://localhost:3000
- **Produção**: https://gerson201.github.io/Sistema-ColmeIA

## 🔐 Credenciais de Teste

- **Admin**: admin / admin123
- **Visitante**: visitante / visitante

## 📊 Funcionalidades Disponíveis

### Dashboard Principal
- ✅ Temperatura Interna (Temp2)
- ✅ Umidade Interna (Hum2)  
- ✅ Temperatura Externa (Temp1)
- ✅ Umidade Externa (Hum1)
- ✅ Peso da Colmeia
- ✅ Frequência Acústica
- ✅ Magnitude Acústica
- ✅ ID do Equipamento

### Recursos Avançados
- ✅ Atualização automática a cada 5 segundos
- ✅ Status colorido (Verde/Amarelo/Vermelho)
- ✅ Gráficos históricos (clique nos cards)
- ✅ Resumo de status organizado
- ✅ Design responsivo
- ✅ Formatação consistente (1 casa decimal)

## 🔥 Firebase Configurado

- **Projeto**: colmeia-bfabc
- **Database**: Realtime Database
- **Estrutura**: leituras_esp32
- **Credenciais**: firebase-credentials.json incluído

## ⚠️ Importante

1. **Firebase**: O arquivo `firebase-credentials.json` deve estar no repositório
2. **CORS**: Configurado para aceitar requisições do GitHub Pages
3. **Backend**: Precisa estar hospedado separadamente (Heroku, Railway, etc.)

## 🎉 Deploy Concluído!

Após seguir estes passos, seu sistema estará disponível em:
**https://gerson201.github.io/Sistema-ColmeIA**

---

**Sistema ColmeIA v2.0** - Pronto para produção! 🐝✨
