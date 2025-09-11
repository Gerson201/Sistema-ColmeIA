## Configuração de ambiente

Crie um arquivo `.env` na raiz com base em `.env.example` com as variáveis:

- `DJANGO_SECRET_KEY`
- `DJANGO_DEBUG`
- `DJANGO_ALLOWED_HOSTS`
- `CORS_ALLOWED_ORIGINS`
- `GOOGLE_APPLICATION_CREDENTIALS`
- `FIREBASE_DB_URL`
- `REACT_APP_API_BASE_URL`

Garanta que `firebase-credentials.json` não esteja no repositório e seja provisionado por variável de ambiente/caminho seguro do sistema.

## Credenciais de desenvolvimento (apenas ambiente local)

Use apenas em ambiente de desenvolvimento:

- Usuário admin: `admin` / `Admin@12345`
- Usuário visitante: `visitante` / `Visitante@123`

Observação: Em produção, crie usuários reais e senhas fortes. Estas credenciais são para testes locais.

# Dashboard de Monitoramento de Colmeia

Este projeto monitora os dados de uma colmeia de abelhas em tempo real, exibindo as informações em um dashboard web.

## Arquitetura

O sistema é composto por um backend em Django, um frontend em React e um futuro aplicativo móvel.

### Backend

- **Framework**: Django com Django Rest Framework.
- **Função**: Atua como um proxy que busca dados em tempo real de um projeto no Firebase Realtime Database.
- **Endpoints da API**:
    - `/api/data/`: Expõe os dados mais recentes recebidos do Firebase.
    - `/api/history/`: Expõe dados históricos processados em blocos, com o valor da mediana para cada bloco.
- **CORS**: Utiliza o pacote `django-cors-headers` para permitir o acesso à API a partir de diferentes origens.

### Frontend

- **Framework**: React (criado com `create-react-app`).
- **Função**: Exibe os dados mais recentes da colmeia em um dashboard e permite a visualização de gráficos históricos.
- **Componentes**:
    - **Dashboard**: Exibe as variáveis em cards individuais. Os cards de Temperatura, Umidade e Peso mudam de cor para indicar possíveis estados de risco.
    - **Gráficos Históricos**: Ao clicar em um card, um modal é aberto com um gráfico mostrando o histórico daquela variável.
- **Lógica**:
    - A cada 5 segundos, faz uma chamada para a API do backend para atualizar o dashboard.
    - Busca dados históricos sob demanda quando um gráfico é solicitado.

### Aplicativo Móvel (Em Planejamento)

- **Plataformas**: Android e iOS.
- **Tecnologia**: Flutter.
- **Objetivo**: Fornecer uma experiência nativa para o monitoramento dos dados da colmeia.
- **Detalhes**: O plano de desenvolvimento completo pode ser encontrado em [`mobile/README.md`](./mobile/README.md).

## Como Executar o Projeto

**Pré-requisitos:**
- Python e o ambiente virtual `venv` devem estar configurados.
- Node.js e npm devem estar instalados.
- O arquivo de credenciais `firebase-credentials.json` deve estar na raiz do projeto.

**1. Iniciar o Backend:**

Abra um terminal na raiz do projeto. Para permitir o acesso de outros dispositivos na mesma rede (incluindo o aplicativo móvel), inicie o servidor no endereço `0.0.0.0`.

```bash
# Navegue até a pasta do backend
cd backend

# Execute o servidor
python manage.py runserver 0.0.0.0:8000
```

**2. Iniciar o Frontend:**

Abra um **segundo terminal**, navegue até a pasta `frontend` e inicie o servidor de desenvolvimento:
```bash
cd frontend
npm start
```

O dashboard estará acessível em `http://localhost:3000` e em outros dispositivos na rede pelo IP do seu computador (ex: `http://192.168.100.7:3000`).

## Histórico de Alterações Recentes

- **Melhora na Exibição de Histórico (Set/2025):**
    - O rótulo dos blocos de dados no gráfico de histórico foi alterado para exibir a data e hora do final do bloco, melhorando a legibilidade.
- **Correção de Bug Crítico no Histórico (Set/2025):**
    - Corrigido um erro 500 que ocorria ao buscar dados históricos. O problema era causado por `timestamps` com tipos de dados mistos (texto e número) no Firebase, o que impedia a ordenação correta dos dados.
- **Melhora na Análise de Dados (Set/2025):**
    - A lógica de análise dos dados brutos do sensor foi aprimorada para ser mais robusta, tratando corretamente caracteres inesperados.