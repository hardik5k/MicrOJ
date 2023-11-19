
FROM node:18-alpine
WORKDIR /.
COPY . .
RUN apk update &&\
    apk add redis &&\
    npm i
CMD node Server/server.js
EXPOSE 3000