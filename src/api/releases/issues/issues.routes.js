'use strict';

const controller = require('./issues.controller');

module.exports = Router => {
  const router = new Router();

  router.get('/', controller.getAll);

  return router;
};
