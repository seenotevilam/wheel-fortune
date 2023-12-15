class Variant {
    constructor(id = -1, label = "", color = "", isDrawn = false) {
        this._id = id;
        this._label = label;
        this._isDrawn = isDrawn;
        this._color = color;
    }

    get label() {
        return this._label;
    }

    get isDrawn() {
        return this._isDrawn;
    }

    get id() {
        return this._id;
    }

    get color() {
        return this._color;
    }

    set color(color) {
        this._color = color;
    }

    set isDrawn(isDrawn) {
        this._isDrawn = isDrawn;
    }

    set id(id) {
        this._id = id;
    }
}
