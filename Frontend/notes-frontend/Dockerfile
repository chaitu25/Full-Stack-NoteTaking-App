<<<<<<< HEAD
FROM node:18-alpine AS build
=======
FROM node:latest AS build
>>>>>>> ce46586 (Dockerizing the application)

WORKDIR /app

COPY package*.json ./

RUN npm config set strict-ssl false
RUN npm install

COPY . ./
RUN npm run build
<<<<<<< HEAD
FROM nginx:1.21-alpine
=======

>>>>>>> ce46586 (Dockerizing the application)
FROM nginx:latest

EXPOSE 80
COPY --from=build /app/build/ /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
