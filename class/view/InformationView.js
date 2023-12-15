class InformationView {
    constructor(element, eventManager, currentVariant) {
        this._currentVaraint = currentVariant;
        this._eventManager = eventManager;
        this._$alert = $(element.find('.Alert').get(0));
        this._initEvents();
        this._show(currentVariant);
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
                self._hide();
            }
        });
    }

    _hide() {
        this._$alert.hide();
    }

    _show(variant) {
        if (variant.id < 0) {
            return "";
        }

        this._$alert.css('color', variant.color);
        this._$alert.html("Выпало " + variant.label);
        this._$alert.show();
    }
}
