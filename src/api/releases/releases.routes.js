"use strict";

const controller = require("./releases.controller");

module.exports = Router => {
  const router = new Router({
    prefix: "/releases",
  });

  router
    .use("/:releaseID/epics", require("./epics")(Router).routes())
    .use("/:releaseID/issues", require("./issues")(Router).routes())
    .use("/:releaseID", require("./epics")(Router).routes())
    .get("/", controller.getAll);

  return router;
};
