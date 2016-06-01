FROM node:6.2.0
EXPOSE 3000

# Install global npm packages
RUN npm install -g gulp-cli@1.2.1

# Install application
RUN mkdir -p /home/app/webapp
WORKDIR /home/app/webapp
ADD . /home/app/webapp

# Install dependencies and provide default command
RUN cd /home/app/webapp && npm install
CMD ["gulp", "start"]
