'use strict';
const logger = require('../../app/utils/logger');
const format = require("pg-format");

class CreateMessagesTable {
  down(db) {
    logger.info('started messages table deletion');
    return db.dropTable('messages')
    .then(() => {
      logger.info('messages table deleted');
    })
    .catch((err) => {
        logger.error(`Failed to delete messages table: ${err}`);
    });
  }
  up(db) {
    logger.info('started  messages table creation');
    const messagesTable = {
        message_id: { type: 'BIGSERIAL', primaryKey: true, autoIncrement: true },
        image_url: 'string',
        author: 'string',
        content: { type: 'text'},
        title: 'string',
        created_at: { type:'timestamp', timezone: true, defaultValue: new String('CURRENT_TIMESTAMP') },
    };

    let queryString = '';
    const authors = ['Sam', 'Samuel', 'Samson', 'Sami'];
    const contents = ['This is my content. \n The quick brown fox jumps over the lazy dog.', 'This is my story. \n The quick brown fox jumps over the lazy dog.', 
        'How do you do. \n The quick brown fox jumps over the lazy dog.', 'Do you know. \n The quick brown fox jumps over the lazy dog.'];
    const titles = ['My Story', 'My status', 'My content', 'That is me'];
    for (let i=0; i<100; i++) {
        let pointer = Math.floor(Math.random() * 4);
        queryString += `insert into messages (image_url, author, content, title) values ('assets/images/avatar${pointer+1}.jpeg', \'${authors[pointer]}\', \'${contents[pointer]}\', \'${titles[pointer]}\');`;
    }
    console.log('\n\n')
    console.log(queryString);
    console.log('\n\n');
    const seedQuery = format(queryString);

    return db.createTable('messages', messagesTable)
    .then(() => db.runSql(seedQuery))
    .then(() => {
        logger.info('messages table created');
    })
    .catch((err) => {
        logger.error(`Failed to create messages table: ${err}`);
    });
  }
}
module.exports = new CreateMessagesTable();
