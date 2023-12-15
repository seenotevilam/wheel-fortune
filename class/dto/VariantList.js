class VariantList
{
    constructor(label, lastPicked, variants = []) {
        this._label = label;
        this._variants = variants;
        this._lastPicked = lastPicked;
    }

    get label() {
        return this._label;
    }

    get variants() {
        return this._variants;
    }

    get lastPicked() {
        return this._lastPicked;
    }

    getNoPicked() {
        let noPicked = [];
        this._variants.forEach(function (variant){
            if(!variant.hasPicked) {
                noPicked.push(variant);
            }
        });

        return noPicked;
    }

    addVariant(variant) {
        if (!variant instanceof Variant) {
            return;
        }
        this._variants.push(variant);
    }

    set lastPicked(variant) {
        this._lastPicked = variant;
    }

    getColors() {
        let colors = [];
        this._variants.forEach(function (variant){
            colors.push(variant.color);
        });

        return colors;
    }

    deleteVariant(id) {
        this._variants.splice(id, 1);

        let index = 0;
        this._variants.forEach(function (variant){
            variant.id = index;
            index++;
        });
    }

    clear() {
        this._variants = [];
    }
}