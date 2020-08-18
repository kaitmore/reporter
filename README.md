# Release Reporter

A service that generates cross-repo release reports based off of GitHub and ZenHub data. It has 2 functions:
    - a scraper that fetches data and caches it in redis, meant to be run as a cron job
    - an API for accessing reports

## Configuration

| Name            | Type   | Default | Description                                                                                                                                                  |
|-----------------|--------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GITHUB_TOKEN    | String | ""      | Github [access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)                                           |
| ZENHUB_TOKEN    | String | ""      | Zenhub [access token](https://github.com/ZenHubIO/API#authentication)                                                                                        |
| REDIS_HOST      | String | ""      | Redis host name                                                                                                                                              |
| REDIS_PASSWORD  | String | ""      | Redis password                                                                                                                                               |
| REDIS_PORT      | String | 6379    | Redis port                                                                                                                                                   |
| RELEASE_REPO_ID | String | ""      | ID of a repository that is associated with the releases you want to track. This is used as the starting point for fetching release data across repositories. |

## Development

To start the app in development, first copy the `.env.example` file to a .env file:

```sh
cp .env.example .env
```

Fill out the `.env` file with your GitHub and ZenHub credentials, then run the following:

```sh
npm install
npm start
```

This will bring up a development docker-compose with Redis, a scraper, and the reporter API. The scraper runs once and then exits. Source code is mounted into the reporter container, so the API will recompile with any code changes.

You can also run `npm run start:prod`, which will build the production docker containers and launch a docker-compose.

## Deployment

Kubernetes deployment files can be found in the top level `/kubernetes` directory. Fill out `/kubernetes/env-configmap.yaml` before applying:

```sh
for f in kubernetes/*.yaml; do kubectl apply -f $f; done
```

## Authors

Kait Moreno - <kaitlinmoreno.com>

## License

This project is licensed under MIT - see the LICENSE file for details
