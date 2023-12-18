const Token = require("./Token");
module.exports = class TokenRepository {
    constructor(db) {
        this._db = db;
    }

    async get(token) {
        let collection = this._db.collection("tokens");
        let tokenFind = await collection.findOne({token: token})
        return tokenFind !== null ? new Token(tokenFind.login, tokenFind.token) : null;
    }

    async delete(token) {
        let collection = this._db.collection("tokens");

        return await collection.deleteOne({token: token})
    }

    async save(token) {
        let collection = this._db.collection("tokens");

        await collection.insertOne(
            {
                token: token.token,
                login: token.login
            }
        );
    }
}