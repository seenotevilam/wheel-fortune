module.exports = class User {
    constructor(login, password = "") {
        this._login = login;
        this._password = password;
    }

    get login() {
        return this._login;
    }

    hasEqualPassword(password) {
        return password === this._password;
    }
}