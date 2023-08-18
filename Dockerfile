FROM node

WORKDIR /usr/src/app

# Copy the main file, frontend.js, .env, and other dependencies
COPY main.js ./
COPY frontend.js ./
COPY .env ./
COPY /public/styles.css /public/styles.css

RUN ["npm", "install", "express", "pg", "dotenv"]

EXPOSE 3000

CMD [ "NODE_TLS_REJECT_UNAUTHORIZED=0" "main.js" ]