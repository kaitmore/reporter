"use strict";

const redis = require("../../db");

const { headers, generateCoveragesReport } = require("./coverages.report");
const csv = require("../../utils/csv.util");

exports.getAll = async ctx => {
  const fileName = `coverages`;

  let stringified_repositories = await redis.get("repositories");
  let repositories = JSON.parse(stringified_repositories);
  ctx.assert(repositories, 404, `Could not find coverages'`);

  let transformedCoverages = generateCoveragesReport(repositories);

  let file = csv(headers, transformedCoverages);

  ctx.set("Content-disposition", `attachment; filename=${fileName}.csv`);
  ctx.status = 200;
  ctx.body = file;
};

