FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm
RUN npm install -D

COPY ./build .

CMD [ "node", "src/index.js"]