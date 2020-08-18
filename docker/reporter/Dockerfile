# base image
FROM node:10-alpine

# set working directory
RUN mkdir -p /app
WORKDIR /app

# copy src
COPY ./src ./src
COPY package.json .

RUN ["npm", "i"]

# start app
CMD ["npm", "start"]

EXPOSE 3000
