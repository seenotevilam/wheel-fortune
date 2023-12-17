let crypto = require('crypto');
const Token = require("./Token");

module.exports = class Authorizer {
    constructor(storageToken, userRepository, tokenRepository) {
        this._storageToken = storageToken;
        this._userRepository = userRepository;
        this._tokenRepository = tokenRepository;
    }

    signup(login, password, cb) {
        let self = this;

        this._userRepository.get(login, function (user) {
            if (user === null) {
                return cb(false);
            }

            let hashPassword = crypto.createHash('sha256')
                .update(password)
                .digest('hex');

            if (!user.hasEqualPassword(hashPassword)) {
                return cb(false);
            }

            let token = self._storageToken.generate();
            self._tokenRepository.save(new Token(login, token), function (isSuccess) {
                if (isSuccess) {
                    self._storageToken.set(token);
                }
                cb(isSuccess);
            });
        });
    }

    logout(cb) {
        let token = this._storageToken.get();
        let self = this;
        this._tokenRepository.delete(token, function (isSuccess) {
            self._storageToken.delete();
            cb(isSuccess);
        })
    }
}