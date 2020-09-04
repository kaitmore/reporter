const axios = require("axios");

module.exports = class CodeClimate {
    constructor({ host = "https://api.codeclimate.com", token }) {
        this.host = host;
        this.token = token;
    }
    async _fetch(endpoint) {
        const { data } = await axios.get(this.host + endpoint, {
            headers: { "Authorization": "Token " + this.token }
        });
        return data;
    }
    async getRepository(repo_slug) {
        return this._fetch(`/v1/repos?github_slug=${repo_slug}`);
    }
    async getCoverage(repo_id, branch) {
        return this._fetch(`/v1/repos/${repo_id}/test_reports?filter[branch]=${branch}&page[size]=1`);
    }
};
