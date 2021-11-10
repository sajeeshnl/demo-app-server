'use strict';

/**
 * Module dependencies.
 */
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const XError = require('x-error');
const err = require('../app/utils/errors');

module.exports = function(config) {
  // Initialize express app
  const app = express();
  app.use(
    compression({
      threshold: 0
    })
  );

  // Environment dependent middleware
  if (process.env.NODE_ENV === 'development') {
    // Enable logger (morgan)
    app.use(morgan('dev'));
  }

  // Request body parsing middleware should be above methodOverride

  app.use(express.json({
    extended: true,
    limit: '5mb'
  }));
  app.use(function(error, req, res, next) {
    next(new XError(err.GENERIC_ERR.input).ex(error));
  });

  app.use(
    express.urlencoded({
      extended: true,
      limit: '5mb'
    })
  );

  // Use helmet to secure Express headers
  app.use(helmet.frameguard());
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(helmet.ieNoOpen());
  app.disable('x-powered-by');

  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, clientsystemid, Authorization'
    );
    next();
  });

  // ELB status check
  app.get('/status.html', function(req, res) {
    res.status(200).send();
  });

  // Register routes
  require('../app/routes')(app, config);

  // Catch-all error handler
  app.use(function(error, req, res, next) {
    if (process.env.NODE_ENV === 'development') {
      console.log('middlewareErrorMessage>>>>',error.message);
      console.log('middlewareError>>>>',error.stack);
    }
    if(error.safe) {
      res.status(error.httpCode).json({
        code: error.code || 401,
        msg: error.httpResponse
      });
    } else {
      res.status(500).json({
        code: 1000,
        msg: 'Internal error'
      });
    }
  });
  // robots route
  app.use('/robots.txt', function (req, res, next) {
    res.type('text/plain')
    res.send("User-agent: *\nDisallow: /");
  });

  // Assume 404 since no middleware responded
  app.use(function(req, res) {
    res.status(404).json({
      statusCode: 404,
      message: 'Invalid route'
    });
  });

  // Return Express server instance
  return app;
};
