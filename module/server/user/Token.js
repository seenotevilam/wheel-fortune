module.exports = class Token {
    constructor(login, token) {
        this._login = login;
        this._token = token;
    }

    get login() {
        return this._login;
    }

    get token() {
        return this._token;
    }
}