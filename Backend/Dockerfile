FROM node:13-alpine

WORKDIR app/

COPY package.json .
RUN npm install

COPY src/ src/
COPY config.json .
VOLUME /app/data/

EXPOSE 3000

CMD ["node", "src/backend.js"]
