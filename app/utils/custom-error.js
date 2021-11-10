'use strict';
class CustomError extends Error {
  constructor(API, message, errObj = {}, params = {}) {
    super(message);
    const apiData = {
        url: API,
        bodyParams: params.body,
        requestUrl: `${params.get('host')}${params.originalUrl}`,
        requestIP: `${params.ip}  -  headers['x-forwarded-for'] : ${params.headers['x-forwarded-for']}`
    };
    Object.assign(this, errObj, apiData);
  }
}

module.exports = CustomError;
