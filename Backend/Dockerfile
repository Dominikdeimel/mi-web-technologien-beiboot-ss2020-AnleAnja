FROM node:13-alpine

COPY package.json .
RUN npm install

WORKDIR app/
COPY src/ src/
RUN mkdir data/

EXPOSE 3000

CMD ["node", "src/backend.js"]