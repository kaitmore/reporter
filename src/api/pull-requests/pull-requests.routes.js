"use strict";

const controller = require("./pull-requests.controller");

module.exports = Router => {
  const router = new Router({
    prefix: "/pull-requests"
  });

  router.get("/", controller.getAll);

  return router;
};
