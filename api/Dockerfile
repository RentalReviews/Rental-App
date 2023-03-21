FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE $PORT

CMD [ "npm", "start" ]
