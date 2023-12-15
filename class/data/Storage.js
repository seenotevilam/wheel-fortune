class Storage {
    constructor(key) {
        this.key = key;
        this.localStorage = localStorage;
    }

    load() {
        let loadedState = JSON.parse(this.localStorage.getItem(this.key));
        if (loadedState === null) {
            return this._createNullState();
        }

        let {wheelDegrees, variantList} = this._createFromStorageLoad(loadedState);

        return new State(variantList, wheelDegrees);
    }

    _createFromStorageLoad(loadedState) {
        let variants = this._getVariants(loadedState._variantList._variants);
        let wheelDegrees = loadedState._wheelDegrees;

        let lastPicked = new Variant(
            loadedState._variantList._lastPicked._id,
            loadedState._variantList._lastPicked._label,
            loadedState._variantList._lastPicked._color,
            loadedState._variantList._lastPicked._hasPicked,
        );

        let variantList = new VariantList(loadedState._label, lastPicked, variants);
        return {wheelDegrees, variantList};
    }

    _createNullState() {
        return new State(
            new VariantList(this.key,
                new Variant()
            )
        )
    }

    _getVariants(variants) {
        let result = [];
        variants.forEach(function (loadedVariant) {
            let variant = new Variant(
                loadedVariant._id,
                loadedVariant._label,
                loadedVariant._color,
                loadedVariant._hasPicked,
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