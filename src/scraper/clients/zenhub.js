const axios = require('axios');

module.exports = class Zenhub {
  constructor({ host = 'https://api.zenhub.com', auth }) {
    this.host = host;
    this.auth = auth;
  }
  async _fetch(endpoint) {
    const { data } = await axios.get(this.host + endpoint, {
      headers: { 'X-Authentication-Token': this.auth },
    });
    return data;
  }
  async getIssuesByRelease(release_id) {
    return this._fetch(`/p1/reports/release/${release_id}/issues`);
  }
  async getIssue(repo_id, issue_number) {
    return this._fetch(`/p1/repositories/${repo_id}/issues/${issue_number}`);
  }
  async getEpic(repo_id, issue_number) {
    return this._fetch(`/p1/repositories/${repo_id}/epics/${issue_number}`);
  }
  async getReleases(repo_id) {
    return this._fetch(`/p1/repositories/${repo_id}/reports/releases`);
  }
};
