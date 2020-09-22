const _ = require("lodash");
const { get_time_since_date } = require("../../../utils/helpers.util");

/**
 * Takes a map of open pull requests and returns a report
 */
function generatePullRequestsReport(pull_requests) {
  const report = Object.keys(pull_requests).map(id => {
    const time_open = get_time_since_date(
      new Date(pull_requests[id].created_at)
    );
    return {
      id: id,
      repo_name: pull_requests[id].repository,
      title: pull_requests[id].title,
      user: pull_requests[id].user.login,
      created_at: pull_requests[id].created_at,
      time_open: time_open,
      url: pull_requests[id].html_url,
      avatar_url: pull_requests[id].user.avatar_url
    };
  });

  return _.sortBy(report, r => -new Date(r.created_at));
}

const headers = [
  {
    id: "time_open",
    title: "Time Since Opened"
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
