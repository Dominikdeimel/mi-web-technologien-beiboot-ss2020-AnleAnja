FROM node:13-alpine

RUN npm install -g http-server

WORKDIR /app

COPY package.json .
RUN npm install

COPY src/ src/
COPY vue.config.js .
COPY .eslintrc.js .

RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]