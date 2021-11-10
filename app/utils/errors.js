/**
 * Application-wide error codes and messages
 */

'use strict';

module.exports = {
  // Code 1000 is reserved for the default error code

  // Generic errors
  GENERIC_ERR: {
    clientSystemId_header: {
      httpCode: 401,
      httpResponse: 'Unauthorized access',
      safe: true
    },
    internal: {
      code: 1001,
      httpCode: 500,
      httpResponse: 'Internal error',
      safe: true
    },
    input: {
      code: 1002,
      httpCode: 400,
      httpResponse: 'Invalid input format',
      safe: true
    },
    id: {
      code: 1003,
      httpCode: 400,
      httpResponse: 'Invalid Id',
      safe: true
    },
    notFound: {
      code: 1004,
      httpCode: 404,
      httpResponse: 'Resource not found',
      safe: true
    },
    unauthorized: {
      httpCode: 401,
      httpResponse: 'Unauthorized access',
      safe: true,
      code: 1007
    },
    number : {
      code: 1006,
      httpCode: 400,
      httpResponse: 'Invalid input format for number',
      safe: true
    }
  }
};
