FROM node:10

# Create app directory
WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 3000

# start command
CMD [ "npm", "start"]