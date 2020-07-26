FROM node:13-alpine

WORKDIR app/

RUN npm install supervisor sass -g

COPY package.json .
RUN npm install

EXPOSE 8080
CMD ["node", "entrypoint.js"]
