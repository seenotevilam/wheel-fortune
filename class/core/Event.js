class Event {
    constructor(name, value = undefined) {
        this._value = value;
        this._name = name;
    }

    get value() {
        return this._value;
    }

    get name() {
        return this._name;
    }
}
