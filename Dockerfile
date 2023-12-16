# Use Node.module v14
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN mkdir /db

RUN npm run build
RUN npm run migrate

# Expose the port
EXPOSE 3000

CMD [ "node", "app.js" ]
