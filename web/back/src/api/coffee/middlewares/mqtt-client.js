'use strict';

/**
 * `mqtt-client` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In mqtt-client middleware.');

    await next();
  };
};
