import type { Schema, Attribute } from '@strapi/strapi';

export interface PhotosInkyPhoto extends Schema.Component {
  collectionName: 'components_photos_inky_photos';
  info: {
    displayName: 'InkyPhoto';
    icon: 'landscape';
  };
  attributes: {
    bmp: Attribute.Media<'images'> & Attribute.Required & Attribute.Private;
    preview: Attribute.Media<'images'> & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'photos.inky-photo': PhotosInkyPhoto;
    }
  }
}
