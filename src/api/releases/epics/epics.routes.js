"use strict";

const controller = require("./epics.controller");

module.exports = Router => {
  const router = new Router();

  router
    .use("/:epicID/issues", require("../issues")(Router).routes())
    .use("/:epicID", require("../issues")(Router).routes())
    .get("/", controller.getAll);

  return router;
};
