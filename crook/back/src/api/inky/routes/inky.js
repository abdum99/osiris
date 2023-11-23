'use strict';

/**
 * inky router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::inky.inky');
