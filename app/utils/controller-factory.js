/**
 * Controller factory function
 */

'use strict';

const logger = require('../utils/logger.js');
const K = require("../constants");

function logToConsole(data) {
  logger.info(JSON.stringify(data, null, ' '));
}

module.exports = function(promiseFn, opts) {
  const _opts = {
      errorCode: 1000,
      successHTTPCode: 200,
      errorHTTPCode: 500,
      errorHTTPResponse: 'Internal error',
      ...opts
    };

  return function(req, res, next) {
    // Wrap every controller
    new Promise(function(resolve, reject) {
      // Controllers are expected to return either a promise or value
      return promiseFn(req, res, next).then(resolve, reject);
    }).then(
      function(data) {
        if (process.env.NODE_ENV === 'development') {
          logToConsole(data);
        }

        if (data === undefined || data === '') {
          res.status(200).send();
        } else {
          
          res.status(_opts.successHTTPCode).json({
            "code": K.COMMON.SUCCESS_CODE,
            "status": K.COMMON.SUCCESS,
            ...data
          });
        }
      },
      function(e) {
        logger.error("errorLogging>>>", e)
        // Handled error
        if (e.safe) {
          const errCode = e.httpCode || _opts.errorHTTPCode;
          const errObj = {
            code: e.code || _opts.errorCode,
            msg: e.httpResponse || _opts.errorHTTPResponse
          };
          res.status(errCode).json(errObj);
        } else {
          // Unhandled error, let the error handling middleware do its job
          next(e);
        }
      }
    );
  };
};
