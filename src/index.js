"use strict";

const http = require("http");
const server = require("./server");

const config = require("./config").server;

async function bootstrap() {
  /**
   * External services init
   */
  require("./db");
  return http.createServer(server.callback()).listen(config.port);
}

bootstrap()
  .then(server =>
    console.log(`🚀 Server listening on port ${server.address().port}!`),
  )
  .catch(err => {
    setImmediate(() => {
      console.error("Unable to run the server because of the following error:");
      console.error(err);
      process.exit();
    });
  });
