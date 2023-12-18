let crypto = require('crypto');
const Token = require("./Token");

module.exports = class Authorizer {
    constructor(storageToken, userRepository, tokenRepository) {
        this._storageToken = storageToken;
        this._userRepository = userRepository;
        this._tokenRepository = tokenRepository;
    }

    async signup(login, password) {
        let self = this;

        let user = await this._userRepository.get(login);

        if (user === null) {
            return null;
        }

        let hashPassword = crypto.createHash('sha256')
            .update(password)
            .digest('hex');

        if (!user.hasEqualPassword(hashPassword)) {
            return null;
        }

        let token = self._storageToken.generate();
        await this._tokenRepository.save(new Token(login, token));
        this._storageToken.set(token);

        return true;
    }

    async logout() {
        let token = this._storageToken.get();
        await this._tokenRepository.delete(token);
        this._storageToken.delete();
    }
}