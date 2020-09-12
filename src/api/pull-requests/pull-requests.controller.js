"use strict";

const redis = require("../../db");

const {
  headers,
  generatePullRequestsReport
} = require("./pull-requests.report");
const csv = require("../../utils/csv.util");

exports.getAll = async ctx => {
  const fileName = "pull_requests";

  let stringified_pull_requests = await redis.get("pull_requests");
  let pull_requests = JSON.parse(stringified_pull_requests);
  ctx.assert(pull_requests, 404, "Could not find pull requests");

  let transformed_pull_requests = generatePullRequestsReport(pull_requests);

  let file = csv(headers, transformed_pull_requests);

  ctx.set("Content-disposition", `attachment; filename=${fileName}.csv`);
  ctx.status = 200;
  ctx.body = file;
};
