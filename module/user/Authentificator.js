module.exports =  class Authentificator {
    constructor(storageToken, tokenRepository, userRepository) {
        this._storageToken = storageToken;
        this._tokenRepository = tokenRepository;
        this._userRepository = userRepository;
    }

    async getUser() {
        let tokenUser = this._storageToken.get();
        let token = await this._tokenRepository.get(tokenUser);
        if (token === null) {
            return null;
        }

        return await this._userRepository.get(token.login);
    }
}