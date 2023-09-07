FROM node:18-alpine
 
WORKDIR /usr/src/app 

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run start:deploy

EXPOSE 8080

CMD [ "node", "dist/main.js" ]