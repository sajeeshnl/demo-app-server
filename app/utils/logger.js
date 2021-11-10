'use strict';
const bunyan = require('bunyan');

const logger = bunyan.createLogger({
  name: 'demo-app-api',
  outputCapture: 'std'
});

module.exports = logger;

