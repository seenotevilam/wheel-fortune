class WheelApplication {

    constructor(id, title) {
        this._eventManager = new EventManager();
        this._storage = new StateStorage(id);
        this._state = this._storage.load();
        this._variantList = this._state.variantList;
        this._colorStack = new ColorsStack(this._variantList.colors);
        new ApplicationView(id, title, this._eventManager, this._state);
        this._initEvents();
    }

    _initEvents() {
        let self = this;
        this._eventManager.subscribe('clicked.variant.add', function (event, eventData) {
            let labelVariant = eventData.value;
            self.addVariant(labelVariant);
        });

        this._eventManager.subscribe('clicked.variant.delete', function (event, eventData) {
            let id = eventData.value;
            self.deleteVariant(id);
        });

        this._eventManager.subscribe('clicked.variant.randomize', function () {
            self.randomize();
        });

        this._eventManager.subscribe('variant.randomized', function (event, eventData) {
            self._storage.save(self._state);
        });

        this._eventManager.subscribe('variant.deleted', function () {
            self._storage.save(self._state);
        });

        this._eventManager.subscribe('variant.added', function () {
            self._storage.save(self._state);
        });
    }

    randomize() {
        if (this._state.wheel.isRunning) {
            return;
        }

        let variants = this._variantList.noDrawnVariants();
        let count = variants.length;

        if (count <= 1) {
            return;
        }

        let rndVariantIndex = Math.floor(Math.random() * count);
        let variant = variants[rndVariantIndex];
        variant.isDrawn = true;
        this._variantList._lastDrawn = variant;
        this._eventManager.publish(new Event('variant.randomize', variant));
    }

    addVariant(labelVariant) {
        if (this._state.wheel.isRunning) {
            return;
        }

        let variant = this._createNewVariant(labelVariant);
        this._variantList.add(variant);
        this._eventManager.publish(new Event('variant.added'));
    }

    deleteVariant(variantId) {
        if (this._state.wheel.isRunning) {
            return;
        }

        let variant = this._variantList.variants[variantId];
        if (this._state.variantList.lastDrawn.id == variantId) {
            console.log( this._state.variantList.lastDrawn);
            this._state.variantList.lastDrawn = new Variant();
        }

        this._colorStack.push(variant.color);
        this._variantList.delete(variant.id);
        this._eventManager.publish(new Event('variant.deleted', variant));
    }

    _createNewVariant(labelVariant) {
        let nextId = this._variantList.variants.length;
        let color = this._colorStack.pop();
        return new Variant(nextId, labelVariant, color);
    }
}

