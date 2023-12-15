class Variant
{
    constructor(id = -1, label = "", color = "", hasPicked = false) {
        this._label = label;
        this._hasPicked = hasPicked;
        this._id = id;
        this._color = color;
    }

    get label() {
        return this._label;
    }

    get hasPicked() {
        return this._hasPicked;
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

    set hasPicked(state) {
        this._hasPicked = state;
    }

    set id(id) {
        this._id = id;
    }
}
