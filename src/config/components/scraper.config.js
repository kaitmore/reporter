'use strict';

const joi = require('joi');

/**
 * Generate a validation schema using joi to check the type of your environment variables
 */
const envSchema = joi
  .object({
    GITHUB_TOKEN: joi.string(),
    ZENHUB_TOKEN: joi.string(),
    RELEASE_REPO_ID: joi.string(),
  })
  .unknown()
  .required();

/**
 * Validate the env variables using joi.validate()
 */
const { error, value: envVars } = joi.validate(process.env, envSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  githubToken: envVars.GITHUB_TOKEN,
  zenhubToken: envVars.ZENHUB_TOKEN,
  releaseRepoID: envVars.RELEASE_REPO_ID,
};

module.exports = config;
