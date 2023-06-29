const fs = require('fs');
require('dotenv').config()

module.exports = {
  development: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: 'afex_dev',
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialect: 'postgres'
  },
  test: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: 'afex_test',
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialect: 'postgres'
  },
  production: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: 'afex_production',
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialect: 'postgres'
  }
}
