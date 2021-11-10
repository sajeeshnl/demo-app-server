/**
 * Route configuration
 */

'use strict';

const messageAPI = require('./message.router');

module.exports = function(app, config) {
  app.use('/', messageAPI);
  // app.use('/:version/:region/:locale/topic', topicsAPI);
  // app.use('/:version/:region/:locale/tags', tagsAPI);
  // app.use('/:version/:region/:locale/banner', bannerAPI);
  // app.use('/:version/:region/:locale/pickup', pickupAPI);
};
