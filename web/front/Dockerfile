FROM node:18-alpine

WORKDIR /app/

RUN ls
RUN pwd

COPY . /app

RUN npm install

CMD npm run dev -- --host
