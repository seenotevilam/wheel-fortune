class Wheel {
    constructor(degrees = 0, isRunning = false) {
        this._degrees = degrees;
        this._isRunning = isRunning;
    }

    set degrees(degrees) {
        this._degrees = degrees;
    }

    set isRunning(isRunning) {
        this._isRunning = isRunning;
    }

    get isRunning() {
        return this._isRunning;
    }

    get degrees() {
        return this._degrees;
    }
}