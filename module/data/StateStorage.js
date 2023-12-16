let State = require('/module/data/State');
let Variant = require('/module/dto/Variant');
let VariantList = require('/module/dto/VariantList');
let Wheel = require('/module/dto/Wheel');

module.exports = class StateStorage {
    constructor(applicationId) {
        this._applicationId = applicationId;
    }

    async load() {
        return await fetch('/state/' + this._applicationId, {
            'content-type': 'application/json',
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (Object.keys(data).length === 0) {
                    return this._createNullState();
                }

                let {wheel, variantList} = this._createFromStorageLoad(data);
                return new State(variantList, wheel);
            });
    }

    _createFromStorageLoad(loadedState) {
        let variants = this._getVariants(loadedState._variantList._variants);
        let lastDrawn = new Variant(
            loadedState._variantList._lastDrawn._id,
            loadedState._variantList._lastDrawn._label,
            loadedState._variantList._lastDrawn._color,
            loadedState._variantList._lastDrawn.isDrawn,
        );

        let variantList = new VariantList(loadedState._id, lastDrawn, variants);
        let wheel = new Wheel(loadedState._wheel._degrees, loadedState._wheel.isRunning);

        return {wheel, variantList};
    }

    _createNullState() {
        return new State(
            new VariantList(
                this._applicationId,
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

    async save(state) {
        await fetch('/state/' + this._applicationId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(state)
        });
    }
}