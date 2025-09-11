# Sistema ColmeIA - Instruções de Uso

## 🚀 Alterações Realizadas

### ✅ Backend (Django)
- **Configuração do Firebase**: Inicialização automática do Firebase nas views
- **Novas Variáveis**: Sistema atualizado para processar Temp1, Hum1, Temp2, Hum2
- **Autenticação**: Sistema de login com token configurado
- **Usuários**: Criados usuários admin e visitante

### ✅ Frontend (React)
- **Dashboard Atualizado**: Exibe Temp1 (Temperatura Interna), Hum1 (Umidade Interna), Temp2 (Temperatura Externa), Hum2 (Umidade Externa)
- **Status Inteligente**: Sistema de cores baseado em valores (verde/amarelo/vermelho)
- **Resumo de Status**: Cards organizados por estado das variáveis

### ✅ Estrutura de Dados Firebase
```
ID:10;TS:2025-09-10 19:45:01;Freq:140.62;Mag:151.23;Temp1:24.5;Hum1:48.0;Peso:-6.79;Temp2:24.4;Hum2:44.3
```

## 🔧 Como Executar o Sistema

### 1. Ativar Ambiente Virtual
```bash
venv\Scripts\activate
```

### 2. Iniciar Backend
```bash
cd backend
python manage.py runserver
```
O backend estará disponível em: `http://localhost:8000`

### 3. Iniciar Frontend
```bash
cd frontend
npm start
```
O frontend estará disponível em: `http://localhost:3000`

## 👤 Credenciais de Login

- **Admin**: 
  - Usuário: `admin`
  - Senha: `admin123`

- **Visitante**: 
  - Usuário: `visitante`
  - Senha: `visitante`

## 📊 Funcionalidades do Dashboard

### Cards Principais
- **Temperatura Interna** (Temp1): Monitora temperatura dentro da colmeia
- **Umidade Interna** (Hum1): Monitora umidade dentro da colmeia
- **Temperatura Externa** (Temp2): Monitora temperatura ambiente externa
- **Umidade Externa** (Hum2): Monitora umidade ambiente externa
- **Peso**: Peso da colmeia
- **Frequência**: Frequência acústica
- **Magnitude Acústica**: Intensidade do som

### Sistema de Status
- 🟢 **Verde**: Valores dentro da faixa ideal
- 🟡 **Amarelo**: Valores em alerta
- 🔴 **Vermelho**: Valores críticos

### Resumo de Status
- Cards organizados mostrando variáveis por estado
- Atualização automática a cada 5 segundos
- Gráficos históricos disponíveis (clique nos cards)

## 🔥 Configuração do Firebase

O sistema está configurado para:
- **Projeto**: colmeia-bfabc
- **Database URL**: https://colmeia-bfabc-default-rtdb.firebaseio.com/
- **Arquivo de Credenciais**: firebase-credentials.json (raiz do projeto)

## 📱 Aplicativo Mobile

O aplicativo mobile (React Native) também foi atualizado para exibir as novas variáveis:
- Temp1, Hum1, Temp2, Hum2
- Mesma API do backend
- Interface adaptada para mobile

## 🚨 Solução de Problemas

### Erro 503 (Firebase não configurado)
- Verifique se o arquivo `firebase-credentials.json` existe na raiz do projeto
- O sistema inicializa o Firebase automaticamente

### Erro de Login
- Use as credenciais: admin/admin123 ou visitante/visitante
- Verifique se o backend está rodando na porta 8000

### Dados não aparecem
- Verifique se há dados no Firebase na estrutura `leituras_esp32`
- O sistema processa automaticamente o formato: `ID:10;TS:2025-09-10 19:45:01;Freq:140.62;Mag:151.23;Temp1:24.5;Hum1:48.0;Peso:-6.79;Temp2:24.4;Hum2:44.3`

## 📈 Próximos Passos

1. **Deploy**: O sistema está pronto para deploy
2. **Monitoramento**: Configure alertas baseados nos status das variáveis
3. **Histórico**: Use os gráficos históricos para análise de tendências
4. **Mobile**: Teste o aplicativo mobile com as mesmas credenciais

---

**Sistema ColmeIA v2.0** - Atualizado com monitoramento interno e externo de temperatura e umidade.
