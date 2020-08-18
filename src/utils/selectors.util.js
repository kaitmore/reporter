/**
 * Takes an array of issue objects, epic objects, and an epicID and returns an array of issues that map to epicID
 */
const getIssuesByEpic = (issues, epics, epicID) => {
  let epic = epics.find(e => e.id == epicID);
  return (
    epic &&
    epic.issues.map(e =>
      issues.find(i => i.repo_id == e.repo_id && i.number == e.issue_number),
    )
  );
};

module.exports = { getIssuesByEpic };
