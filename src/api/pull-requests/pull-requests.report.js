/**
 * Takes a map of open pull requests and returns a report
 */
function generatePullRequestsReport(pull_requests) {
  return Object.keys(pull_requests).map(id => {
    console.log(pull_requests[id].user);
    return {
      id: id,
      repo_name: pull_requests[id].repository,
      title: pull_requests[id].title,
      user: pull_requests[id].user.login,
      created_at: pull_requests[id].created_at,
      url: pull_requests[id].url
    };
  });
}

const headers = [
  {
    id: "id",
    title: "Pull Request ID"
  },
  {
    id: "created_at",
    title: "Created At"
  },
  {
    id: "repo_name",
    title: "Repository Name"
  },
  {
    id: "title",
    title: "Title"
  },
  {
    id: "user",
    title: "User"
  },
  {
    id: "url",
    title: "URL"
  }
];

module.exports = { headers, generatePullRequestsReport };
