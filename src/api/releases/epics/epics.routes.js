'use strict';

const controller = require('./epics.controller');

module.exports = Router => {
  const router = new Router();
  const issues_routes = require('../issues')(Router).routes();

  router
    .use('/:epicID/issues', issues_routes)
    .use('/:epicID', issues_routes)
    .get('/', controller.getAll);

  return router;
};
