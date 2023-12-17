module.exports =  class Authentificator {
    constructor(storageToken, tokenRepository, userRepository) {
        this._storageToken = storageToken;
        this._tokenRepository = tokenRepository;
        this._userRepository = userRepository;
    }

    getUser(cb) {
        let self = this;
        let tokenUser = this._storageToken.get();
        this._tokenRepository.get(tokenUser, function (token){
            if (token === null) {
                cb(null);
                return;
            }
            self._userRepository.get(token.login, function (user){
                cb(user);
            });
        });
    }
}