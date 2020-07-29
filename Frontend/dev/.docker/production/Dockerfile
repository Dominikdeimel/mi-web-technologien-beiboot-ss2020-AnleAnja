FROM node:13-alpine

WORKDIR app/

RUN npm install sass -g

COPY package.json .
RUN npm install

COPY . .

RUN sass --quiet --style=compressed assets/scss/styles.scss:public/css/styles.min.css
RUN babel assets/js/main.js -o public/js/main.min.js

EXPOSE 8080

CMD ["node", "src/app.js"]
