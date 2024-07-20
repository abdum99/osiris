module.exports = [
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  {
    name: 'strapi::poweredBy',
    config: {
      poweredBy: 'Your Mom'
    }
  },
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
