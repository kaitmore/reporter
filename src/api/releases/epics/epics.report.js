/**
 * Takes an array of epics and returns an epic report
 */
function generateEpicsReport(epics, issues) {
  const getFullIssue = i =>
    issues.find(x => x.number == i.issue_number && x.repo_id == i.repo_id);

  return epics.map(e => {
    const total_issues = e.issues.length;
    const completed_issues = e.issues.reduce((a, i) => {
      const issue = getFullIssue(i);
      return issue && issue.state === "closed" ? ++a : a;
    }, 0);
    const remaining_issues = total_issues - completed_issues;

    const total_points =
      (e.total_epic_estimates && e.total_epic_estimates.value) || 0;
    const remaining_points = e.issues.reduce((a, i) => {
      const issue = getFullIssue(i);
      const points = (i && i.estimate && i.estimate.value) || 0;
      return issue && issue.state === "open" ? points + a : a;
    }, 0);

    return {
      id: e.id,
      total_points,
      completed_issues,
      remaining_issues,
      total_issues,
      title: JSON.stringify(e.title),
      status: e.state,
      repo: e.repo,
      remaining_points
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
    title: "Epic"
  },
  {
    id: "total_points",
    title: "Total Points"
  },
  {
    id: "remaining_points",
    title: "Remaining Points"
  },
  {
    id: "total_issues",
    title: "# Total Issues"
  },
  {
    id: "remaining_issues",
    title: "# Remaining Issues"
  },
  {
    id: "status",
    title: "Status"
  }
];

module.exports = { headers, generateEpicsReport };
