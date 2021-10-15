FROM node:14-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY tsconfig*.json ./
COPY src src
RUN npm run build

FROM node:14-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
RUN chown node:node .
USER node
COPY package*.json ./
RUN npm install
COPY --from=builder /usr/src/app/build/* .
EXPOSE 3000
ENTRYPOINT [ "node", "index.js" ]