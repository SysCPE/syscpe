FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm
RUN npm install -D

COPY . .

CMD [ "npm", 'run', 'start']