FROM node:14-alpine

WORKDIR app/

COPY package.json .
RUN npm install

COPY src/ src/
RUN npm run build

COPY config.json .
VOLUME /app/data/

EXPOSE 3000

CMD ["node", "dist/backend.js"]
