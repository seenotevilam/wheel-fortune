const sqlite3 = require('sqlite3').verbose();

const DB_NAME = './db/application.sqlite';

module.exports = new sqlite3.Database(DB_NAME);