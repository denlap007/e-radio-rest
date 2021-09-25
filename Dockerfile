FROM node:16-alpine3.14

ENV NODE_ENV=production

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force 

# Bundle app source
COPY ./src .

EXPOSE 8080
CMD [ "node", "index.js" ]