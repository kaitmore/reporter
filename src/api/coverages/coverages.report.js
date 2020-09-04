/**
 * Takes a map of coverages and returns an coverage report
 */
function generateCoveragesReport(repositories) {
  return Object.keys(repositories).map(key => {
    return {
      repo_id: key,
      repo_name: repositories[key].full_name,
      lines: repositories[key].lines,
      coverage: repositories[key].coverage
    };
  });
}

const headers = [
  {
    id: "repo_id",
    title: "Repository ID"
  },
  {
    id: "repo_name",
    title: "Repository Name"
  },
  {
    id: "lines",
    title: "Lines"
  },
  {
    id: "coverage",
    title: "Coverage"
  }
];

module.exports = { headers, generateCoveragesReport };
