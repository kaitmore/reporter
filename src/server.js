const Koa = require("koa");
const bodyParser = require("koa-bodyparser")();
const compress = require("koa-compress")();
const cors = require("@koa/cors")(/* Add your cors option */);
const helmet = require("koa-helmet")(/* Add your security option */);
const logger = require("koa-logger")();
const path = require("path");
const errorHandler = require("./middleware/error.middleware");
const applyApiMiddleware = require("./api");
const serveStatic = require("koa-static");
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
console.log(path.join(__dirname, "index.html"));
server.use(serveStatic(__dirname));
/**
 * Apply to our server the api router
 */
applyApiMiddleware(server);

module.exports = server;
