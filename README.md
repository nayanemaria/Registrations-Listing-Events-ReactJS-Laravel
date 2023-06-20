## Este projeto foi desenvolvido em ReactJS(FrontEnd) e Laravel Framework(BackEnd)

## Instruções de instalação e execução de projetos em ReactJS e Laravel

Este é um guia, passo a passo, para ajudar a instalar e executar projetos que utilizam as tecnologias ReactJS e Laravel. Essas são duas tecnologias populares para desenvolvimento web frontend e backend, respectivamente.

## Pré-requisitos:

Antes de começar, certifique-se de ter os seguintes pré-requisitos instalados em seu sistema:

- Node.js: O ReactJS requer o Node.js para funcionar corretamente. Você pode baixar a versão mais recente do Node.js em https://nodejs.org/.

- Composer: O Laravel requer o Composer, um gerenciador de pacotes para PHP. Você pode baixar o Composer em https://getcomposer.org/.

- Servidor de banco de dados: O Laravel utiliza um servidor de banco de dados para armazenar e gerenciar dados. Certifique-se de ter um servidor de banco de dados MySQL, PostgreSQL ou SQLite instalado e configurado.

## Instalação

## Passo 1: Clonar o repositório

Clone o repositório do projeto para o seu sistema usando o Git:

"git clone <URL_DO_REPOSITORIO>"

## Passo 2: Instalar dependências do ReactJS

Navegue até o diretório do projeto ReactJS e instale as dependências do projeto usando o npm:

"npm install"

## Passo 3: Instalar dependências do Laravel

Navegue até o diretório do projeto Laravel e instale as dependências do projeto usando o Composer:

"composer install"

## Passo 4: Configurar variáveis de ambiente do Laravel

Renomeie o arquivo .env.example para .env. Em seguida, abra o arquivo .env e configure as variáveis de ambiente necessárias, como as configurações do banco de dados.

## Passo 5: Executar migrações do Laravel

Execute as migrações do Laravel para criar as tabelas no banco de dados:

"php artisan migrate"

## Execução

Agora que você concluiu a instalação, pode executar o projeto.

## Executar o servidor de desenvolvimento do ReactJS

Navegue até o diretório do projeto ReactJS e inicie o servidor de desenvolvimento do ReactJS:

"npm start"

O servidor de desenvolvimento será executado e você poderá acessar o projeto no seu navegador em http://localhost:3000.

## Executar o servidor do Laravel

Navegue até o diretório do projeto Laravel e inicie o servidor do Laravel:

"php artisan serve""

O servidor do Laravel será iniciado e você poderá acessar o projeto no seu navegador em http://127.0.0.1:8000/.

