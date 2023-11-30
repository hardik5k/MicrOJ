FROM node:18
WORKDIR /
RUN apt-get update
RUN apt-get install apt-utils
RUN apt-get install gcc -y
RUN apt-get install g++ -y
COPY package*.json .
RUN npm i
COPY . .
CMD npm start