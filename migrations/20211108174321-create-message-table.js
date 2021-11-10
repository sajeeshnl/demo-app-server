'use strict';

var dbm;
var type;
var seed;

const createMessagesTables = require('./lib/create-messages-table');

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return createMessagesTables.up(db);
};

exports.down = function(db) {
  return createMessagesTables.down(db);
};

exports._meta = {
  "version": 1
};
