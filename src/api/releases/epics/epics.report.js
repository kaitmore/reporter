/**
 * Takes an array of epics and returns an epic report
 */
function generateEpicsReport(epics, issues) {
  return epics.map(e => {
    const total_issues = e.issues.length;
    const completed_issues = e.issues.reduce((a, i) => {
      const issue = issues[`${i.repo_id}:${i.issue_number}`];
      return issue && issue.state === "closed" ? a++ : a;
    }, 0);
    const remaining_issues = total_issues - completed_issues;

    const total_points = e.total_epic_estimates && e.total_epic_estimates.value;
    const remaining_points = e.issues.reduce((a, i) => {
      const issue = issues[`${i.repo_id}:${i.issue_number}`];
      return (issue && issue.estimate && issue.estimate.value) || 0;
    }, 0);

    return {
      total_points,
      completed_issues,
      remaining_issues,
      total_issues,
      title: e.title,
      status: e.state,
      repo: e.repo,
      remaining_points,
    };
  });
}

const headers = [
  {
    id: "repo",
    title: "Repository",
  },
  {
    id: "title",
    title: "Epic",
  },
  {
    id: "total_points",
    title: "Total Points",
  },
  {
    id: "remaining_points",
    title: "Remaining Points",
  },
  {
    id: "total_issues",
    title: "# Total Issues",
  },
  {
    id: "remaining_issues",
    title: "# Remaining Issues",
  },
  {
    id: "status",
    title: "Status",
  },
];

module.exports = { headers, generateEpicsReport };
