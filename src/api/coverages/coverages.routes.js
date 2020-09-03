"use strict";

const controller = require("./coverages.controller");

module.exports = Router => {
  const router = new Router({
    prefix: "/coverages"
  });

  router.get("/", controller.getAll);

  return router;
};
