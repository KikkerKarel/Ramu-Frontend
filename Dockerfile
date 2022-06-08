# pull the base image
FROM node:16.14.2-alpine

# set the working direction
WORKDIR /app

# add `app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

COPY package-lock.json ./

RUN npm install

COPY ./ /app

CMD ["npm", "start"]
