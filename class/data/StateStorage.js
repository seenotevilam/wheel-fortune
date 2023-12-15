class StateStorage {
    constructor(key) {
        this.key = key;
        this.localStorage = localStorage;
    }

    load() {
        let loadedState = JSON.parse(this.localStorage.getItem(this.key));
        if (loadedState === null) {
            return this._createNullState();
        }

        let {wheel, variantList} = this._createFromStorageLoad(loadedState);

        return new State(variantList, wheel);
    }

    _createFromStorageLoad(loadedState) {
        let variants = this._getVariants(loadedState._variantList._variants);
        let lastDrawn = new Variant(
            loadedState._variantList._lastDrawn._id,
            loadedState._variantList._lastDrawn._label,
            loadedState._variantList._lastDrawn._color,
            loadedState._variantList._lastDrawn.isDrawn,
        );

        let variantList = new VariantList(loadedState._label, lastDrawn, variants);
        let wheel = new Wheel(loadedState._wheel._degrees, loadedState._wheel.isRunning);

        return {wheel, variantList};
    }

    _createNullState() {
        return new State(
            new VariantList(
                this.key,
                new Variant()
            ),
            new Wheel()
        )
    }

    _getVariants(variants) {
        let result = [];
        variants.forEach(function (loadedVariant) {
            let variant = new Variant(
                loadedVariant._id,
                loadedVariant._label,
                loadedVariant._color,
                loadedVariant._isDrawn,
            );
            result.push(variant);
        });

        return result;
    }

    save(state) {
        this.localStorage.setItem(this.key, JSON.stringify(state));
    }

    delete() {
        this.localStorage.removeItem(this.key);
    }
}