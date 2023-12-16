let Event = require('/module/core/Event');

module.exports = class UserInterfaceView
{
    constructor(elementList, eventManager, isBlocked = false) {
        this._elementList = elementList;
        this._eventManager = eventManager;
        this._isBlocked = isBlocked;
        this._initButtons();
        this._initEvents();
        if (isBlocked) {
            this._block(true);
        }
    }

    _initButtons() {
        this._addButton = this._elementList.find('.addNewVariantButton');
        this._addInput = this._elementList.find('.addNewVariantInput');
        this._deleteButton = this._elementList.find('.deleteVariantButton');
        this._randomizeButton = this._elementList.find('.randomVariantButton');
    }

    _initEvents() {
        let self = this;

        this._eventManager.subscribe('clicked.variant.randomize', function (event, eventData) {
            self._block(true);
        });

        this._eventManager.subscribe('variant.randomized', function (event, eventData) {
            self._block(false);
        });

        this._initAddNewVariant();
        this._initDeleteVariant();
        this._initRandomizeVariant();
    }

    _block(isBlock) {
        this._isBlocked = isBlock;
        this._addButton.prop('disabled', isBlock);
        this._addInput.prop('disabled', isBlock);
        this._elementList.find('.deleteVariantButton').prop('disabled', isBlock);
        this._randomizeButton.prop('disabled', isBlock);
    }

    _initAddNewVariant() {
        let self = this;
        let input = this._addInput;

        this._addButton.on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();

            if (self._isBlocked) {
                return;
            }
            self.formSubmitted(input, self);
        });

        this._addInput.keypress(function (e) {
            if (self._isBlocked) {
                return;
            }

            if (e.which === 13) {
                self.formSubmitted(input, self)
                return false;
            }
        });
    }

    formSubmitted(input, self) {
        let labelVariant = input.val();
        if (labelVariant.length === 0) {
            return;
        }
        input.val("");

        self._eventManager.publish(
            new Event('clicked.variant.add', labelVariant)
        )
    }

    _initDeleteVariant() {
        let self = this;

        if (self._isBlocked) {
            return;
        }

        this._deleteButton.live('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
           let id = $(this).prev().text();
            self._eventManager.publish(
               new Event('clicked.variant.delete', id)
            )
        });
    }

    _initRandomizeVariant() {
        let self = this;

        if (self._isBlocked) {
            return;
        }

        this._randomizeButton.on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            self._eventManager.publish(
                new Event('clicked.variant.randomize'))
        });
    }
}