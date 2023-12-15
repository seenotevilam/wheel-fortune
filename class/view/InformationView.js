class InformationView {
    constructor(element, eventManager, currentVariant = null) {
        this._currentVaraint = currentVariant;
        this._eventManager = eventManager;
        this._$alert = $(element.find('.Alert').get(0));
        this._initEvents();

        if (this._currentVaraint.id > 0) {
            this._show(this._currentVaraint);
        }

    }

    _initEvents() {
        let self = this;
        this._eventManager.subscribe('variant.randomize', function () {
            self._hide();
        });

        this._eventManager.subscribe('variant.randomized', function (event, eventData) {
            self._currentVaraint = eventData.value;
            self._show(self._currentVaraint);
        });

        this._eventManager.subscribe('variant.deleted', function (event, eventData) {
            let variant = eventData.value;
            if (variant.id === self._currentVaraint.id) {
                self._currentVaraint.id = -1;
                self._hide();
            }
        });
    }

    _hide() {
        this._$alert.hide();
    }

    _show(variant) {
        this._$alert.show();
        this._$alert.css('color', variant.color);
        this._$alert.html("Выпало " + variant.label);
    }
}
