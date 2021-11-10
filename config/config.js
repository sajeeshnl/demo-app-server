'use strict';

/**
 * Module dependencies.
 */
const glob = require('glob');
const chalk = require('chalk');
require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const environmentFiles = glob(`./config/env/${NODE_ENV}.js`, {
  sync: true
});

if (!environmentFiles.length) {
  if (NODE_ENV) {
    console.error(
      chalk.red(
        `No configuration file found for "${NODE_ENV}"` +
          ' environment, using default development environment'
      )
    );
  } else {
    console.error(
      chalk.red(
        'NODE_ENV is not defined! Using default development environment'
      )
    );
  }

  NODE_ENV = 'development';
} else {
  console.log(
    chalk.black.bgWhite(
      `Application loaded using the "${NODE_ENV}"` +
        ' environment configuration'
    )
  );
}

// Export application configurations
module.exports = {
  ...require('./env/all'),
  ...require('./env/' + NODE_ENV) || {}
};
