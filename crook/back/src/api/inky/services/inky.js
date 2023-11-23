'use strict';

/**
 * inky service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::inky.inky');
