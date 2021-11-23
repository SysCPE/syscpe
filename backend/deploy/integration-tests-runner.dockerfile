FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -D

COPY . .

ENTRYPOINT [ "npm", "run", "integration-test"]