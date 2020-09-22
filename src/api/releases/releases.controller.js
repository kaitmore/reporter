"use strict";

const redis = require("../../db");

const { serveRequest } = require("../../utils/helpers.util");
const { headers } = require("./releases.report");

exports.getAll = async ctx => {
  let stringified_releases = await redis.get("releases");
  let releases = JSON.parse(stringified_releases);
  let fileName = "releases";

  serveRequest(ctx, releases, headers, fileName);
};
