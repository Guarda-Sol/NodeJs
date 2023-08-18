FROM node

WORKDIR /usr/src/app

COPY main.js .

RUN ["npm", "install", "express", "pg", "dotenv"]

EXPOSE 3000

CMD [ "NODE_TLS_REJECT_UNAUTHORIZED=0" "main.js" ]