'use strict';

const redis = require('../../../db');
const _ = require('lodash');

const { headers, generateIssuesReport } = require('./issues.report');
const csv = require('../../../utils/csv.util');
const { getIssuesByEpic } = require('../../../utils/selectors.util');

exports.getAll = async ctx => {
  const { releaseID, epicID } = ctx.params;
  const fileName = `release-${releaseID}-issues`;

  let stringified_issues = await redis.get('issues_by_release');
  let issues = JSON.parse(stringified_issues)[releaseID];
  ctx.assert(issues, 404, `Could not find issues in release '${releaseID}'`);

  if (epicID) {
    let stringified_epics = await redis.get('epics_by_release');
    let epics_by_release = JSON.parse(stringified_epics)[releaseID];

    issues = getIssuesByEpic(issues, epics_by_release, epicID);
    ctx.assert(
      issues,
      404,
      `Could not find issues for epic with ID '${epicID}'`,
    );
  }

  let transformedIssues = generateIssuesReport(issues);

  let file = csv(headers, transformedIssues);

  ctx.set('Content-disposition', `attachment; filename=${fileName}.csv`);
  ctx.status = 200;
  ctx.body = file;
};
