module.exports = class ColorsStack {

    static defaultColors = [
        '#00d25b',
        '#fc424a',
        '#ffab00',
        '#0090e7',
        '#336633',
        '#8f5fe8',
        '#17a2b8',
        '#6610f2',
    ];

    constructor(colors = []) {
        let self = this;
        this._colorListStack = [];

        ColorsStack.defaultColors.forEach(function (color) {
            if (!self._inArray(color, colors)) {
                self._colorListStack.push(color);
            }
        })
    }

    pop() {
        if (this._colorListStack.length === 0) {
            this._fillStackByDefaultsColor();
        }

        return this._colorListStack.pop();
    }

    push(color) {
        this._colorListStack.push(color);
    }

    _fillStackByDefaultsColor() {
        let self = this;

        let color = ColorsStack.defaultColors.pop();
        ColorsStack.defaultColors.unshift(color);

        ColorsStack.defaultColors.forEach(function (color) {
            self._colorListStack.push(color);
        })
    }

    _inArray(needle, haystack) {
        for (let i = 0; i < haystack.length; i++) {
            if (haystack[i] === needle) {
                return true;
            }
        }

        return false;
    }
}
