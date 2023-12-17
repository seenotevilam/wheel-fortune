let randomstring = require("randomstring");

module.exports = class TokenCookieStorage {
    constructor(request, response) {
        this._response = response;
        this._request = request;
    }

    get() {
        return this._request.cookies.authtoken ? this._request.cookies.authtoken : null;
    }

    set(token) {
        this._response.cookie('authtoken', token, {expire : 24 * 60 * 60 * 365 });
    }

    delete() {
        this._response.cookie('authtoken', null);
    }

    generate() {
        return randomstring.generate(
            {
                length: 32,
                charset: 'alphabetic'
            }
        );
    }
}