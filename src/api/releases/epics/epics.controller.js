"use strict";

const redis = require("../../../db");
const csv = require("../../../utils/csv.util");
const { headers, generateEpicsReport } = require("./epics.report");

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

  let file = csv(headers, epics_to_report);

  ctx.set("Content-disposition", `attachment; filename=${fileName}.csv`);
  ctx.status = 200;
  ctx.body = file;
};
