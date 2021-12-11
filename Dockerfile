FROM node:14-slim

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

RUN yarn --cwd ./client install
RUN yarn --cwd ./client build 

EXPOSE 5000

CMD [ "server.js" ]