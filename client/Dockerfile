# Same as api - to reduce download time
FROM node:6.2.0
EXPOSE 8100

# Install global npm packages
RUN npm install -g ionic@1.7.15 cordova@6.1.1

# Install application
RUN mkdir -p /home/app/webapp
WORKDIR /home/app/webapp
ADD msgclient/ /home/app/webapp

# Install dependencies and provide default command
RUN cd /home/app/webapp && npm install
CMD ["ionic", "serve", "-ab"]
