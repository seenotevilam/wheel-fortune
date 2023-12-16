let db = require('./database');

let sql = `CREATE TABLE application_state (application_id TEXT PRIMARY KEY, state TEXT)`;
db.run(sql);