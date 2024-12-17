FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force

RUN npm install -g npm@11.0.0

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
