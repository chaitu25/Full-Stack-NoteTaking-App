FROM node:latest AS build

WORKDIR /app

COPY package*.json ./

RUN npm config set strict-ssl false
RUN npm install

COPY . ./

CMD ["npm", "run", "start"]




