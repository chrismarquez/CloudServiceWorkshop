FROM node:18-alpine

RUN mkdir app
WORKDIR /app

COPY src ./src
COPY *.json ./
RUN npm install

RUN node_modules/typescript/bin/tsc

COPY dist ./dist

WORKDIR /app

CMD ["node", "dist/index.js"]
