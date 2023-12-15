class State {
    constructor(variantList, wheel) {
        this._variantList = variantList;
        this._wheel = wheel;
    }

    get variantList() {
        return this._variantList;
    }

    set variantList(variantList) {
        this._variantList = variantList;
    }

    get wheel() {
        return this._wheel;
    }

    set wheel(wheel) {
        this._wheel = wheel;
    }
}