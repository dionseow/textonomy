FROM node:14.8.0-alpine3.12

WORKDIR /app

ENV PATH /app/node_modules/.bin$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm config set strict-ssl false
RUN npm install

COPY . ./

CMD ["npm", "start"]
