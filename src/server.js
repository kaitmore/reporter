const Koa = require("koa");
const bodyParser = require("koa-bodyparser")();
const compress = require("koa-compress")();
const cors = require("@koa/cors")(/* Add your cors option */);
const helmet = require("koa-helmet")(/* Add your security option */);
const logger = require("koa-logger")();

const errorHandler = require("./middleware/error.middleware");
const applyApiMiddleware = require("./api");

const server = new Koa();

/**
 * Pass to our server instance middlewares
 */
server
  .use(logger)
  .use(errorHandler)
  .use(helmet)
  .use(compress)
  .use(cors)
  .use(bodyParser);

/**
 * Apply to our server the api router
 */
applyApiMiddleware(server);

module.exports = server;
