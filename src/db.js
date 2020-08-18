const ioredis = require('ioredis');

const config = require('./config').database;

let redis;
try {
  redis = new ioredis(config.redisHost, {
    password: config.redisPassword,
    port: config.redisPort || 6379,
  });
} catch (e) {
  console.error(e);
}

module.exports = redis;
