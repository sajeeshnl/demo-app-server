'use strict';

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

const config = require('./config/config');
const dbOps = require('./config/data-source');
const logger = require('./app/utils/logger');


// Bootstrap db connection
dbOps
  .initializeDb()
  .then(() => {
    logger.info('connected to db');
  })
  .catch(err => {
    logger.error(err);
  });

// Init the express application
const app = require('./config/express')(config);

// Start the app by listening on <port>
const server = app.listen(config.port);

server.keepAliveTimeout = 61000;

server.headersTimeout = 65000;

// Expose app
exports = module.exports = app;

// Logging initialization
logger.info(`API Server started on port ${config.port}`);