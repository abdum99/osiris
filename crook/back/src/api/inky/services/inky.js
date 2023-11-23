'use strict';

/**
 * inky service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::inky.inky', ({ strapi }) => ({
    async updateInky(...args) {
        strapi.log.info("HEHEHOHO", JSON.stringify(args["pic"]))
    }
}));
