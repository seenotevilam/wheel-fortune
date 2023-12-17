const User = require("./User");
module.exports = class UserRepository {
    constructor(db) {
        this._db = db;
    }

    get(login, cb) {
        let sql = `SELECT login, password
                   FROM user
                   WHERE login = ?`;

        let user = null;

        this._db.get(sql, [login], (err, row) => {
            if (row) {
                user = new User(row.login, row.password);
            }
            cb(user);
        });
    }

}