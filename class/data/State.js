class State {
    constructor(variantList, wheelDegrees = 0) {
        this._variantList = variantList;
        this._wheelDegrees = wheelDegrees;
    }

    get variantList() {
        return this._variantList;
    }

    get wheelDegrees() {
        return this._wheelDegrees;
    }

    set variantList(variantList) {
        this._variantList = variantList;
    }

    set wheelDegrees(wheelDegrees) {
        this._wheelDegrees = wheelDegrees;
    }
}