# Use Node.module v14
FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN mkdir -p /usr/src/app/db

RUN npm run build

# Expose the port
EXPOSE 3000

CMD [ "node", "app.js" ]
