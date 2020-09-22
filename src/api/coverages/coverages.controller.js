"use strict";

const redis = require("../../db");

const { headers, generateCoveragesReport } = require("./coverages.report");
const { serveRequest } = require("../../utils/helpers.util");

exports.getAll = async ctx => {
  const fileName = "coverages";

  let stringified_repositories = await redis.get("repositories");
  let repositories = JSON.parse(stringified_repositories);
  ctx.assert(repositories, 404, "Could not find coverages'");

  let transformedCoverages = generateCoveragesReport(repositories);

  serveRequest(ctx, transformedCoverages, headers, fileName);
};
