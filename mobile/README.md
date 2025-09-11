# Plano de Desenvolvimento do Aplicativo Móvel - Sistema ColmeIA

Este documento descreve o plano para a criação de um aplicativo móvel para o Sistema ColmeIA, que funcionará em dispositivos Android e iOS.

## 1. Visão Geral

O objetivo é criar um aplicativo móvel que permita aos usuários monitorar os dados da colmeia em tempo real e visualizar o histórico de medições, consumindo a API do backend Django existente.

## 2. Tecnologia Proposta

-   **Framework:** **Flutter** com a linguagem **Dart**.
    -   **Motivo:** Flutter é uma solução moderna do Google para o desenvolvimento de aplicativos multiplataforma de alta performance com uma única base de código, garantindo uma experiência de usuário nativa e consistente em Android e iOS.
-   **Gerenciamento de Estado:** Provider ou Riverpod.
-   **Cliente HTTP:** Pacote `http` ou `dio` para realizar chamadas à API.
-   **Gráficos:** Biblioteca `fl_chart` para a exibição dos gráficos de histórico.

## 3. Estrutura do Projeto

-   Todo o código-fonte do aplicativo móvel será localizado em uma nova pasta `mobile/` na raiz deste projeto.

## 4. Funcionalidades Principais

-   **Tela Principal (Dashboard):**
    -   Exibirá os dados mais recentes da colmeia (Temperatura, Umidade, Peso, etc.).
    -   Os dados serão apresentados em cartões (Cards) para fácil visualização, similar à aplicação web.
-   **Tela de Histórico:**
    -   Ao tocar em um cartão de dados no dashboard, o usuário navegará para uma tela de detalhes.
    -   Esta tela exibirá um gráfico de linha com o histórico da variável selecionada.
-   **Conexão com o Backend:**
    -   O aplicativo fará requisições HTTP para a API Django existente.
    -   Endpoints a serem consumidos: `/api/data/` (para dados em tempo real) e `/api/history/` (para os dados históricos).

## 5. Design e Experiência do Usuário (UX)

-   O design seguirá as diretrizes do **Material Design**, resultando em uma interface limpa, moderna e intuitiva.
-   A navegação será simples, focada em permitir que o usuário acesse as informações desejadas com o mínimo de toques.

## 6. Próximos Passos

1.  Inicializar o projeto Flutter na pasta `mobile/` com o comando `flutter create .`.
2.  Adicionar as dependências necessárias (`http`, `fl_chart`, etc.) ao arquivo `pubspec.yaml`.
3.  Desenvolver a estrutura de pastas do aplicativo (models, views/screens, services, widgets).
4.  Implementar o serviço de API para comunicação com o backend.
5.  Desenvolver a tela de Dashboard.
6.  Desenvolver a tela de Gráfico de Histórico.
