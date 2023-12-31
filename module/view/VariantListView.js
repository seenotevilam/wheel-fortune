module.exports = class VariantListView {
    constructor(label, element, title, eventManager, variantList) {
        this._list = new List(label, {
            valueNames: ['label', 'id', 'isDrawn']
        });
        this._eventManager = eventManager;
        this._variantList = variantList;
        this._initEvents();
        this._renderTitle(element, title);
        this._update(this._variantList.variants);
    }

    _renderTitle(element, title) {
        let titleElements = $(element).find('.Title').get(0);
        titleElements.innerHTML = title;
    }

    _initEvents() {
        let self = this;

        this._eventManager.subscribe('variant.added', function () {
            self._update();
        });

        this._eventManager.subscribe('variant.deleted', function () {
            self._update();
        });

        this._eventManager.subscribe('variant.randomized', function () {
            self._update();
        });
    }

    _update() {
        let variantsObject = this._getVariantListElements(this._variantList.variants);
        this._list.clear();
        this._list.add(variantsObject);
        this._list.items.forEach(function (item) {
            let values = item.values();
            let isDrawn = values.isDrawn;

            if (isDrawn) {
                let element = $(item.elm);
                element
                    .addClass('anime__review__item__text_active')
                    .css('border-color', values.color);
            }
        });
    }

    _getVariantListElements(variants) {
        let variantsListElements = []
        variants.forEach(function (variant) {
            variantsListElements.push(
                {
                    'label': variant.id +  1 +' ' + variant.label,
                    'id': variant.id,
                    'isDrawn': variant.isDrawn,
                    'color': variant.color
                }
            );
        });

        return variantsListElements;
    }
}
