'use strict';

class DBQueries {
  getInsertQuery(tableName, tableFields, primaryKey) {
    try {
      const primaryKeysExcluded = tableFields.filter(x => !primaryKey.includes(x));
      let insertQuery = `INSERT INTO ${tableName} (${tableFields.join(
        ','
      )}) VALUES %L ON CONFLICT(${primaryKey}) DO UPDATE SET `;

      primaryKeysExcluded.forEach(field => {
        insertQuery += `${field} = EXCLUDED.${field}, `;
      });
      insertQuery = insertQuery.replace(/,\s*$/, "");
      insertQuery += ` RETURNING *`;
      return insertQuery;
    } catch (error) {
      throw error;
    }

  }

  getSelectQuery(tableName, fields = null, filter = null, limit = null, offset = null, order = null) {
    try {
      return `SELECT ${fields ? `${fields.join(',')}` : '*'} FROM ${tableName} 
      ${filter ? `WHERE ${filter}` : ''}
      ${limit ? `LIMIT ${limit}` : ''}
      ${offset ? `LIMIT ${offset}` : ''}
      ${order ? `ORDER BY ${order}` : ''}
      ;`;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Function to update edit query
   * @param {*} tableName 
   * @param {*} tableFields 
   * @param {*} whereFilter 
   */
  getUpdateQuery(tableName, tableFields, whereFilter) {
    try {
      let updateFields = tableFields.map((item, index) => `${item} = $${index+1}`).join(', ');
      return `UPDATE ${tableName} SET ${updateFields} 
      WHERE ${whereFilter}`;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Function to get aggregate query for topics, pickup
   * @param {*} tableName 
   * @param {*} fields 
   */
   getAggregateQuery(tableName, fields) {
    try {
      let requiredValues = fields.map((item) => `'${item}', content_list_table.${item}`).join(', ');
      let queryString = {
        text: `select 
        json_build_object('disp_no_${tableName}_list', 
        array_agg(json_build_object(
          'disp_no', aggregated_table.disp_num, 
          'genre_list', genre_list))) ${tableName}_array 
        from (
            select 
            genre_code_table.disp_num,
            array_agg(
               json_build_object(
                    'genre_code', genre_code_table.genre_code,
                    '${tableName}_list', ${tableName}_list  
                    )
                ) genre_list
        from  (
                select 
                genre_code, 
                disp_no as disp_num,
                array_agg(
                    json_build_object(
                      ${requiredValues}
                    )
                    order by content_list_table.sequence asc, content_list_table.created_at desc
                ) ${tableName}_list
        from ${tableName} content_list_table
        where displaying_from <= current_timestamp and displaying_until >= current_timestamp
        group by content_list_table.genre_code, content_list_table.disp_no
        ) as genre_code_table
        group by genre_code_table.disp_num) as aggregated_table;`
      } 
      return queryString;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Function to get delete query
   * @param {*} tableName 
   * @param {*} whereFilter 
   */
   getDeleteQuery(tableName, whereFilter) {
    try {
      return `DELETE FROM ${tableName} WHERE ${whereFilter}`;
    } catch (err) {
      
      throw err;
    }
  }
  
}

module.exports = new DBQueries();
