class VariantList {
    constructor(label, lastDrawn = null, variants = []) {
        this._label = label;
        this._variants = variants;
        this._lastDrawn = lastDrawn === null ? new Variant() : lastDrawn;
    }

    get label() {
        return this._label;
    }

    get variants() {
        return this._variants;
    }

    get lastDrawn() {
        return this._lastDrawn;
    }

    noDrawnVariants() {
        let noDrawnVariants = [];
        this._variants.forEach(function (variant) {
            if (!variant.isDrawn) {
                noDrawnVariants.push(variant);
            }
        });

        return noDrawnVariants;
    }

    add(variant) {
        if (!variant instanceof Variant) {
            return;
        }
        this._variants.push(variant);
    }

    set lastDrawn(lastDrawn) {
        this._lastDrawn = lastDrawn;
    }

    get colors() {
        let colors = [];
        this._variants.forEach(function (variant) {
            colors.push(variant.color);
        });

        return colors;
    }

    delete(id) {
        this._variants.splice(id, 1);

        let index = 0;
        this._variants.forEach(function (variant) {
            variant.id = index;
            index++;
        });
    }

    clear() {
        this._variants = [];
    }
}