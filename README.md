# Teste Gazin - API RESTfull - Laravel+React.js

## Vaga de Desenvolvedor

Projeto desenvolvido em PHP, utilizando o framework Laravel  no backend e React.Js no frontend.

O projeto consiste em 2 CRUDS, um de desenvolvedores e um de níveis, consumindo uma API RESTfull.

🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de teste.

📋 Pré-requisitos

De que tecnologias você precisa para instalar o software e como instalá-lo?

- Docker

🔧 Instalação

- Clone o projeto utilizando o comando **git clone https://github.com/alnsousa1/api-rest-laravel-react**
- Renomeie o arquivo **.env.dev** para **.env**
- Abra o terminal e rode um **docker-compose up —build** para buildar os containers do projeto
- Em seguida, em um novo terminal, entre no container laravel e rode as migrations com o comando **docker exec laravel_app php artisan migrate**
- Agora basta acessar **http://localhost:3000/** no navegador para utilizar o projeto. **(Crie um Level antes de criar um Desenvolvedor)**

🔧 Testes

- Caso queira rodar os testes, abra o terminal, acesse o container laravel rodando o comando **docker exec laravel_app php artisan test**
