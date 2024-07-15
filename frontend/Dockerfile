# Utiliza a imagem oficial do Node.js
FROM node:16

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos da aplicação
COPY . .

# Instala as dependências do npm
RUN npm install

# Compila a aplicação
RUN npm run build

# Instala o servidor HTTP
RUN npm install -g serve

# Expõe a porta 3000
EXPOSE 3000

# Inicia o servidor HTTP para servir a aplicação React
CMD ["serve", "-s", "build"]
