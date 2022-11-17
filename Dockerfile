FROM node:14.15.1

LABEL maintainer="Fhandy Ahmad <fhandya@gmail.com>"

# Nodemon for development
RUN npm install --global nodemon

# Cached layer for node modules
ADD ./package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app

# Add project files
WORKDIR /usr/src/app
ADD . /usr/src/app

EXPOSE 3000

CMD ["nodemon", "-L", "/usr/src/app/bin/www"]