let db = require('./database');

let sql = `CREATE TABLE IF NOT EXISTS application_state (application_id TEXT PRIMARY KEY, state TEXT, login TEXT)`;
db.run(sql);
sql = `CREATE TABLE IF NOT EXISTS user (login TEXT PRIMARY KEY, password TEXT)`;
db.run(sql);
sql = `CREATE TABLE IF NOT EXISTS token (login TEXT, token TEXT)`;
db.run(sql);
