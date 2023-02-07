FROM node:18.13.0-alpine

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN yarn

COPY . .

CMD yarn dev