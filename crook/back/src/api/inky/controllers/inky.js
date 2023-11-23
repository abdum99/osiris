'use strict';

/**
 * inky controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::inky.inky', ({ strapi }) => ({
    async next(ctx) {
        const inky = await strapi.entityService.findOne('api::inky.inky', 1, {
            populate: '*'
        });

        const new_index = (inky.current_index + 1) % inky.photos.length
        await strapi.entityService.update('api::inky.inky', 1, {
            data: {
                current_index: new_index
            }
        });

        await strapi.service('api::inky.inky').updateInky(inky.photos[new_index]);

        return await super.find(ctx);
    }
}));
