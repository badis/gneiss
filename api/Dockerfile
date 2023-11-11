FROM node:20.9.0

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . . 

EXPOSE 5000
CMD ["npm", "run", "start:dev"]

