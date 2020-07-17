FROM node:13-alpine

WORKDIR app/

RUN npm install supervisor -g

COPY package.json .
RUN npm install

COPY . .

EXPOSE 8080

CMD ["supervisor", "src/app.js"]
