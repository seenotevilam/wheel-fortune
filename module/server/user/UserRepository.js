const User = require("./User");
module.exports = class UserRepository {
    constructor(db) {
        this._db = db;
    }

    async get(login) {
        let collection = this._db.collection("users");
        let userFind = await collection.findOne({'login': login});

        return userFind !== null ? new User(userFind.login, userFind.password) : null;
    }
}