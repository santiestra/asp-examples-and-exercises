# Latest Node.js image
FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

COPY wait_for_it.sh ./
RUN chmod +x wait_for_it.sh

EXPOSE 3456
CMD [ "npm", "start" ]
