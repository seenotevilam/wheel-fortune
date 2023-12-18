const {MongoClient, ServerApiVersion} = require('mongodb');

require('dotenv').config()

let user = process.env.DB_USER;
let password = process.env.DB_PASSWORD;
let host = process.env.DB_HOST;
let dbname = process.env.DB_NAME;

let uri = 'mongodb+srv://' + user + ':' + password +'@' + host;

let client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

module.exports = client.db(dbname);
