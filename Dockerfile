FROM node:latest

# Define o diretório de trabalho
WORKDIR /api

# Copia apenas arquivos necessários para instalar dependências
COPY package.json yarn.lock ./

# Instala dependências
RUN yarn install

# Copia todo o código da aplicação
COPY . .

# Exponha a porta
EXPOSE 3333

# Inicia o aplicativo
CMD ["yarn", "dev"]
