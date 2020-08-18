# base image
FROM node:10-alpine

# set working directory
RUN mkdir -p /app
WORKDIR /app

COPY ./src/scraper ./scraper
COPY ./src/config ./config
COPY ./package.json .
COPY ./src/db.js .

RUN ["npm", "i"]

# start app
CMD ["npm", "run", "scrape"]
