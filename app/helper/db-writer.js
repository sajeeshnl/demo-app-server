'use strict';

const format = require('pg-format');
const dbPool = require('../../config/data-source');
const logger = require('../utils/logger');

class DBQueryWriter {
  async getInsertDBWriter(insertQuery, dataArray) {
    try {
      const formattedQuery = format(insertQuery, dataArray);
      return await this.runSQLQuery(formattedQuery)
    } catch (err) {
      logger.error(`Error occurred in inserting: ${err}`);
      throw err;
    }
  }

  async runSQLQuery(query) {
    try {
      return await dbPool.dbClient.query(query);
    } catch (err) {
      throw err
    }
  }
}

module.exports = new DBQueryWriter();
