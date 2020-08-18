const _ = require("lodash");

const redis = require("../db");
const config = require("../config").scraper;

const Zenhub = require("./clients/zenhub");
const Github = require("./clients/github");

const zenhub = new Zenhub({ auth: config.zenhubToken });
const github = Github(config.githubToken);

const cache = {
  releases: {},
  epics_by_release: {},
  issues_by_release: {},
  repositories: {}
};

(async function() {
  console.log("⚽️ Fetching all releases...");

  const releases = await zenhub.getReleases(config.releaseRepoID);
  cache.releases = _.keyBy(releases, "release_id");

  for (let release_id in cache.releases) {
    const release = cache.releases[release_id];
    console.log(
      ` ⚾️ Fetching all zenhub issues in release '${release.title}'`
    );
    // array of issues with issue_number and repo_id
    const issues_by_release = await zenhub.getIssuesByRelease(
      release.release_id
    );
    // group issues by repo
    const repos = _.groupBy(issues_by_release, "repo_id");

    console.log(
      " 🏈 Fetching the corresponding github issues by repository..."
    );
    for (let repo_id in repos) {
      try {
        const { data: repository } = await github.repos.getById({
          id: repo_id
        });
        console.log("  ", "✅", repository.name);
        cache.repositories[repo_id] = _.pick(repository, [
          "id",
          "full_name",
          "private",
          "owner",
          "organization"
        ]);

        for (var i = 0; i < repos[repo_id].length; i++) {
          const issue_number = repos[repo_id][i].issue_number;

          let { data: github_issue } = await github.issues.get({
            owner: repository.organization.login,
            repo: repository.name,
            issue_number
          });

          let zenhub_issue;
          try {
            zenhub_issue = await zenhub.getIssue(repo_id, issue_number);
          } catch (e) {
            console.error(e);
          }

          let issue_to_cache = {
            ...github_issue,
            ...zenhub_issue,
            release_id,
            repo_id,
            repo: repository.name
          };
          if (zenhub_issue && zenhub_issue.is_epic) {
            const epic = await zenhub.getEpic(repo_id, issue_number);
            issue_to_cache = { ...issue_to_cache, ...epic };
            if (_.get(cache.epics_by_release, release_id)) {
              cache.epics_by_release[release_id].push(issue_to_cache);
            } else {
              cache.epics_by_release[release_id] = [issue_to_cache];
            }
          } else {
            if (_.get(cache.issues_by_release, release_id)) {
              cache.issues_by_release[release_id].push(issue_to_cache);
            } else {
              cache.issues_by_release[release_id] = [issue_to_cache];
            }
          }
          // Avoid rate limiting
          await wait(500);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }
  console.log("✍️", "Writing cache to redis...");
  await redis.set("epics_by_release", JSON.stringify(cache.epics_by_release));
  await redis.set("issues_by_release", JSON.stringify(cache.issues_by_release));
  await redis.set("repositories", JSON.stringify(cache.repositories));
  await redis.set("releases", JSON.stringify(cache.releases));
  console.log("🏅", "Finished updating cache!");
  process.exit();
})();

function wait(milleseconds) {
  return new Promise(resolve => setTimeout(resolve, milleseconds));
}
