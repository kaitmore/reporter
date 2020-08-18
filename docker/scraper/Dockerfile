# base image
FROM node:10-alpine

# set working directory
RUN mkdir -p /app
WORKDIR /app

COPY ./src/scraper ./src/scraper
COPY ./src/config ./src/config
COPY ./package.json .
COPY ./src/db.js ./src

RUN ["npm", "i"]

# start app
CMD ["npm", "run", "scrape"]
