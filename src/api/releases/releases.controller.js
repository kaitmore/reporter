'use strict';

const redis = require('../../db');
const _ = require('lodash');

const csv = require('../../utils/csv.util');
const { headers } = require('./releases.report');

exports.getAll = async ctx => {
  let stringified_releases = await redis.get('releases');
  let releases = JSON.parse(stringified_releases);
  let fileName = `releases`;
  let file = csv(headers, releases);

  ctx.set('Content-disposition', `attachment; filename=${fileName}.csv`);
  ctx.status = 200;
  ctx.body = file;
};
