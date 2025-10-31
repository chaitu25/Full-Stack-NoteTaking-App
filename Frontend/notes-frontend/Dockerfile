FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm config set strict-ssl false
RUN npm install

COPY . ./
RUN npm run build
FROM nginx:1.21-alpine
FROM nginx:latest

EXPOSE 80
COPY --from=build /app/build/ /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
