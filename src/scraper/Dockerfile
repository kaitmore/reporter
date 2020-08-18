# for local development only. Should not be pushed to docker hub
# src code is mounted to container

# base image
FROM node:10-alpine

# set working directory
RUN mkdir -p /app
WORKDIR /app

# start app
CMD ["npm", "run", "scrape"]