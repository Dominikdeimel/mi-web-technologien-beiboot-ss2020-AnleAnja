FROM node:13

COPY package.json .
RUN npm install

COPY src/ .
RUN mkdir data/

EXPOSE 3000

CMD ["node", "backend.js"]