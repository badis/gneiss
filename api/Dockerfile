FROM node:21.2.0-alpine

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . . 

EXPOSE 5000
CMD ["npm", "run", "start:dev"]

