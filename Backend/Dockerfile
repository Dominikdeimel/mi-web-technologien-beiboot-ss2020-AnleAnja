FROM node:13-alpine

WORKDIR app/

COPY package.json .
RUN npm install

COPY src/ src/
RUN mkdir data/

EXPOSE 3000

WORKDIR src/

CMD ["node", "src/backend.js"]