const Token = require("./Token");
module.exports = class TokenRepository {
    constructor(db) {
        this._db = db;
    }

    get(token, cb) {
        let sql = `SELECT token, login
                   FROM token
                   WHERE token = ?`;

        let findToken = null;

        this._db.get(sql, [token], (err, row) => {
            if (row) {
                findToken = new Token(row.login, row.token);
            }
            cb(findToken);
        });
    }

    delete(token, cb) {
        let sql = `DELETE FROM token WHERE token = ?`;

        this._db.run(sql, [token], (err, row) => {
            if (err) {
                cb(false);
            } else {
                cb(true);
            }
        });
    }

    save(token, cb) {
        let sql = `INSERT
        OR REPLACE 
               INTO token(token, login) 
               VALUES(?, ?)`;

        this._db.run(sql, [token.token, token.login], (err, row) => {
            if (err) {
                cb(false);
            } else {
                cb(true);
            }
        });
    }
}