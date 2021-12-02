FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -D

COPY . .

RUN npm run build

ENTRYPOINT ["node", "./build/migrations_runner.js"]