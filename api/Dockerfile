FROM strapi/base:latest

# Create app directory
WORKDIR /app

COPY package.json /app

# install
RUN npm install

COPY . /app

# RUN rm yarn.lock
# RUN npm
RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 1337

# start command
CMD [ "npm", "start"]