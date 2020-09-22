"use strict";

const redis = require("../../../db");

const { headers, generateEpicsReport } = require("./epics.report");
const { serveRequest } = require("../../../utils/helpers.util");

exports.getAll = async ctx => {
  const { releaseID } = ctx.params;
  const fileName = `release-${releaseID}-epics`;

  let stringified_epics = await redis.get("epics_by_release");
  let stringified_issues = await redis.get("issues_by_release");
  let epics_by_release = JSON.parse(stringified_epics);
  let issues_by_release = JSON.parse(stringified_issues);

  let epics_to_report = generateEpicsReport(
    epics_by_release[releaseID],
    issues_by_release[releaseID]
  );

  serveRequest(ctx, epics_to_report, headers, fileName);
};
