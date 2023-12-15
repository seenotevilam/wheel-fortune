class WheelApplication {

    constructor(title, label) {
        this._eventManager = new EventManager();
        this._storage = new Storage(label);
        this._state = this._storage.load();
        console.log(this._state);
        this._variantList = this._state.variantList;
        this._colorStack = new ColorsStack(this._variantList.getColors());
        new ApplicationView(label, title, this._eventManager, this._state);
        this._initEvents();
    }

    _initEvents() {
        let self = this;
        this._eventManager.subscribe('clicked.variant.add', function (event, eventData) {
            self.addNewVariant(eventData.value);
            self._eventManager.publish(new Event('variant.added'));
            self._storage.save(self._state);
        });

        this._eventManager.subscribe('clicked.variant.delete', function (event, eventData) {
            let id = eventData.value;
            let pickedVariant = self._variantList.variants[id];
            self.deleteVariant(pickedVariant);
            self._eventManager.publish(new Event('variant.deleted', pickedVariant));
            self._storage.save(self._state);
        });

        this._eventManager.subscribe('clicked.variant.randomize', function () {
            self.randomize();
        });

        this._eventManager.subscribe('variant.randomized', function (event, eventData) {
            self._variantList.lastPicked = eventData.value;
            self._storage.save(self._state);
        });
    }

    randomize() {
        let variants = this._variantList.getNoPicked();
        let count = variants.length;

        if (count === 0) {
            return;
        }

        this._variantList.lastPicked = -1;
        let rndVariantIndex = Math.floor(Math.random() * count);
        let variant = variants[rndVariantIndex];
        this._eventManager.publish(new Event('variant.randomize', variant));
    }

    addNewVariant(labelVariant) {
        let newId = this._variantList.variants.length;
        let color = this._colorStack.pop();
        let variant = new Variant(newId, labelVariant,color);
        this._variantList.addVariant(variant);
    }

    deleteVariant(variant) {
        this._variantList.deleteVariant(variant.id);
        this._colorStack.push(variant.color);
    }
}

