'use strict';

const { Pool } = require('pg');
const config = require('./config');
const logger = require('../app/utils/logger');
class PgPool {
  constructor() {
    this.config = {
      user: config.dbUser,
      host: config.host,
      database: config.dbName,
      password: config.password,
      port: config.dbPort,
      max: 20
    }
  }

  async initializeDb() {
    return new Promise((resolve, reject) => {
      this.pool = new Pool(this.config);
      this.pool.connect((err, client) => {
        if (err) {
          logger.error(`DB Connection error pool1: ${err}`);
          reject(err);
        } else {
          this.dbClient = client;
          resolve();
        }
      });
    });
  }
}

module.exports = new PgPool();
