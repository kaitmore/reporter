"use strict";

const joi = require("joi");

/**
 * Generate a validation schema using joi to check the type of environment variables
 */
const envSchema = joi
  .object({
    REDIS_HOST: joi.string(),
    REDIS_PORT: joi.number(),
    REDIS_PASSWORD: joi.string(),
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
  database: {
    redisHost: envVars.REDIS_HOST,
    redisPort: envVars.REDIS_PORT,
    redisPassword: envVars.REDIS_PASSWORD,
  },
};

module.exports = config;
