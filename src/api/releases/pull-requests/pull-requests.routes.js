"use strict";

const controller = require("./pull-requests.controller");

module.exports = Router => {
  const router = new Router();

  router.get("/", controller.getAll);

  return router;
};
