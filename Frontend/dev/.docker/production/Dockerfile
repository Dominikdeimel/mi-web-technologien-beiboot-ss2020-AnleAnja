FROM node:13-alpine

WORKDIR app/

RUN npm install sass -g

COPY package.json .
RUN npm install

COPY . .

RUN sass --quiet --style=compressed assets/scss/styles.scss:public/css/styles.min.css
RUN npm run production 

EXPOSE 8080

CMD ["node", "src/app.js"]
