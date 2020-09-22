"use strict";

const redis = require("../../../db");

const {
  headers,
  generatePullRequestsReport
} = require("./pull-requests.report");

const { serveRequest } = require("../../../utils/helpers.util");

exports.getAll = async ctx => {
  const { releaseID } = ctx.params;
  const fileName = "pull_requests";

  let stringified_pull_requests = await redis.get("pull_requests_by_release");
  let pull_requests = JSON.parse(stringified_pull_requests);
  ctx.assert(pull_requests, 404, "Could not find pull requests");

  let transformed_pull_requests = generatePullRequestsReport(
    pull_requests[releaseID]
  );

  serveRequest(ctx, transformed_pull_requests, headers, fileName);
};
