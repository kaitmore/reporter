/**
 * Takes an array of epics and returns an epic report
 */
function generateIssuesReport(issues) {
  return issues.map(i => {
    return {
      id: i.id,
      title: i.title,
      status: i.state,
      repo: i.repo,
      points: i.estimate && i.estimate.value
    };
  });
}

const headers = [
  {
    id: "id",
    title: "ID"
  },
  {
    id: "repo",
    title: "Repository"
  },
  {
    id: "title",
    title: "Issue"
  },
  {
    id: "points",
    title: "Total Points"
  },
  {
    id: "status",
    title: "Status"
  }
  // {
  //   id: "epic_title",
  //   title: "Parent Epic"
  // }
];

module.exports = { headers, generateIssuesReport };
