'use strict';

const K = require('../constants');
const dbQuery = require('../helper/db-query');
const dbWriter = require('../helper/db-writer');
const { DateTime } = require('luxon');

class messageService {
  constructor() { }

  async createMessage(params) {
    try {
      const createMessageInsertQuery = dbQuery.getInsertQuery('messages', K.TABLE_FIELDS.MESSAGE, 'message_id');
      const dataArray = [[params.body.author, params.body.content, params.body.image_url, params.body.title
      ]];
      return await dbWriter.getInsertDBWriter(createMessageInsertQuery, dataArray);
    } catch (error) {
      throw error;
    }
  }

  async getData(params) {
    try {
      const limit = params.query.limit;
      const offset = params.query.offset;
      let queryString = {
        text: `SELECT json_build_object('total_messages_count', coalesce((array_agg(DISTINCT data_rows.full_count))[1], 0),
        'messages', coalesce(json_agg((SELECT x FROM (select message_id, created_at, ${K.TABLE_FIELDS.MESSAGE.join(',')}) AS x)), '[]'::json)
        )
        FROM (
          SELECT *, count(*) OVER() AS full_count 
            FROM messages
            where ($1::text is null or author ilike $1 or title ilike $1 or content ilike $1)
            ORDER BY created_at DESC
            ${limit ? `limit ${limit}` : ''}
            ${offset ? `offset ${offset}` : ''}
        ) AS data_rows;`, values: [
          params.query.query ? `%${params.query.query}%` : null,

        ]
      };
      return await dbWriter.runSQLQuery(queryString);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new messageService();
