# 🚀 Guia de Deploy - Sistema ColmeIA

## ✅ Status: PRONTO PARA DEPLOY!

O projeto está completamente configurado para deploy no GitHub Pages.

## 📋 Checklist de Deploy

### ✅ Configurações Concluídas:
- [x] Frontend React configurado
- [x] Package.json com homepage configurada
- [x] GitHub Actions configurado
- [x] .gitignore configurado
- [x] README.md criado
- [x] Build scripts configurados

## 🔧 Passos para Deploy

### 1. Preparar o Repositório GitHub

```bash
# 1. Criar repositório no GitHub
# 2. Clonar o repositório
git clone https://github.com/SEU-USUARIO/sistema-colmeia.git
cd sistema-colmeia

# 3. Copiar os arquivos do projeto para o repositório
# 4. Fazer commit inicial
git add .
git commit -m "Sistema ColmeIA - Deploy inicial"
git push origin main
```

### 2. Configurar GitHub Pages

1. Vá para **Settings** do repositório
2. Role até **Pages** no menu lateral
3. Em **Source**, selecione **GitHub Actions**
4. Salve as configurações

### 3. Atualizar URL no package.json

Edite o arquivo `frontend/package.json` e altere:

```json
"homepage": "https://SEU-USUARIO.github.io/sistema-colmeia"
```

### 4. Deploy Automático

O GitHub Actions irá:
- ✅ Detectar push na branch main
- ✅ Instalar dependências
- ✅ Fazer build do React
- ✅ Deploy automático para GitHub Pages

## 🌐 URLs de Acesso

- **Desenvolvimento**: http://localhost:3000
- **Produção**: https://SEU-USUARIO.github.io/sistema-colmeia

## 🔐 Credenciais de Teste

- **Admin**: admin / admin123
- **Visitante**: visitante / visitante

## 📱 Funcionalidades Disponíveis

### Dashboard Principal
- Temperatura Interna (Temp2)
- Umidade Interna (Hum2)
- Temperatura Externa (Temp1)
- Umidade Externa (Hum1)
- Peso da Colmeia
- Frequência Acústica
- Magnitude Acústica
- ID do Equipamento

### Recursos Avançados
- ✅ Atualização automática a cada 5 segundos
- ✅ Status colorido (Verde/Amarelo/Vermelho)
- ✅ Gráficos históricos (clique nos cards)
- ✅ Resumo de status organizado
- ✅ Design responsivo
- ✅ Formatação consistente (1 casa decimal)

## 🔥 Firebase

O sistema está configurado para usar dados reais do Firebase:
- **Projeto**: colmeia-bfabc
- **Database**: Realtime Database
- **Estrutura**: leituras_esp32

## ⚠️ Importante

1. **Firebase Credentials**: O arquivo `firebase-credentials.json` deve estar no repositório para o deploy funcionar
2. **CORS**: O backend precisa estar configurado para aceitar requisições do domínio do GitHub Pages
3. **HTTPS**: O GitHub Pages força HTTPS, certifique-se de que o backend também suporte

## 🐛 Solução de Problemas

### Se o deploy falhar:
1. Verifique os logs do GitHub Actions
2. Confirme se todas as dependências estão no package.json
3. Teste o build localmente: `npm run build`

### Se os dados não aparecerem:
1. Verifique se o Firebase está configurado
2. Confirme se o backend está acessível
3. Verifique o console do navegador para erros

## 🎉 Deploy Concluído!

Após seguir estes passos, seu sistema estará disponível em:
**https://SEU-USUARIO.github.io/sistema-colmeia**

---

**Sistema ColmeIA v2.0** - Pronto para produção! 🐝✨
