class UserInterfaceView
{
    constructor(elementList, eventManager) {
        this._elementList = elementList;
        this._eventManager = eventManager;
        this._initButtons();
        this._initEvents();
    }

    _initButtons() {
        this._addButton = this._elementList.find('.addNewVariantButton');
        this._addInput = this._elementList.find('.addNewVariantInput');
        this._deleteButton = this._elementList.find('.deleteVariantButton');
        this._randomizeButton = this._elementList.find('.randomVariantButton');
    }

    _initEvents() {
        if (!this._eventManager instanceof EventManager) {
            return;
        }

        this._initAddNewVariant();
        this._initDeleteVariant();
        this._initRandomizeVariant();
    }

    _initAddNewVariant() {
        let self = this;
        let input = this._addInput;

        this._addButton.on('click', function () {
            self.formSubmitted(input, self);
        });

        this._addInput.keypress(function (e) {
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

        this._deleteButton.live('click', function () {
           let id = $(this).prev().text();
            self._eventManager.publish(
               new Event('clicked.variant.delete', id)
            )
        });
    }

    _initRandomizeVariant() {
        let self = this;
        this._randomizeButton.on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            self._eventManager.publish(
                new Event('clicked.variant.randomize'))
        });
    }
}