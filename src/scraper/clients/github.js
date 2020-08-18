const { Octokit } = require("@octokit/rest");

module.exports = function(auth) {
  const octokit = new Octokit({ auth });
  Object.assign(octokit.repos, {
    getById: octokit.request.defaults({
      method: "GET",
      url: "/repositories/:id",
      params: {
        id: {
          type: "string",
          required: true
        }
      }
    })
  });
  return octokit;
};
