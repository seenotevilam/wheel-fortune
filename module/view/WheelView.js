let Event = require('/module/core/Event');

module.exports = class WheelView {
    constructor(element, eventManager, variantList, wheel) {
        this._eventManager = eventManager;
        this._wheel = wheel;
        this._variantList = variantList;
        this._initEvents();
        this._initViewElements(element);
        this._update();
    }

    _initViewElements(element) {
        this._$block = $(element.find('.wheel_block').get(0));
        this._$wheelContainer = $(element.find('.wheel_drum_container').get(0));
    }

    _initEvents() {
        let self = this;
        this._eventManager.subscribe('variant.added', function () {
            if (self._variantList.lastDrawn.id > 0) {
                return;
            }

            self._wheel.degrees = 0;
            self._update();
        });

        this._eventManager.subscribe('variant.deleted', function (event, eventData) {
            if (self._variantList.lastDrawn.id >= 0) {
                return;
            }

            self._wheel.degrees = 0;
            self._update();
        });

        this._eventManager.subscribe('variant.randomize', function (event, eventData) {
            let variant = eventData.value;
            self._wheel.degrees = 0;
            self._update(variant);
            self._run(variant);
        });
    }

    _update() {
        if (this._wheel.isRunning) {
            return;
        }

        let variantsForRenderSectors = this._getVariantsForRenderSectors(this._variantList.variants, this._variantList.lastDrawn);
        let angleSectionPercent = Math.round(100 / variantsForRenderSectors.length);
        this._render(variantsForRenderSectors, angleSectionPercent);
    }

    _calculateDeltaDegrees(variantsForRenderSectors, winnerIndex) {
        let variantsForRenderSectorsLength = variantsForRenderSectors.length;
        let rounds = 2 + Math.floor(Math.random() * 2);
        let wheelSectionsPath = rounds * variantsForRenderSectorsLength + (variantsForRenderSectorsLength - winnerIndex);
        let degSection = Math.round(360 / variantsForRenderSectorsLength);
        let padding = Math.round(degSection / 4 + Math.floor(Math.random() * degSection / 2));
        return Math.round(wheelSectionsPath * degSection - padding + 90);
    }

    _getWinnerIndex(variantsForRenderSectors, winnerVariant) {
        let winnerIndex = -1;
        variantsForRenderSectors.forEach(function (variant, index) {
            if (variant.id === winnerVariant.id) {
                winnerIndex = index;
            }
        })
        return winnerIndex;
    }

    _render(variantsForRenderSectors, angleSectionPercent) {
        let self = this;

        this._$block.show();
        this._$wheelContainer.html(this._template());
        this._$dram = $(this._$wheelContainer.find('.wheel_drum').get(0));
        this._$dram.css('transform', 'rotate(' + this._wheel.degrees + 'deg)')

        this._$text = $(this._$wheelContainer.find('.wheel_text').get(0));

        let gradient = "";
        let endPercent = angleSectionPercent;
        let angleDegrees = Math.round(360 / variantsForRenderSectors.length) / 2;
        let rotate = 90 + angleDegrees;

        variantsForRenderSectors.forEach(function (variant, index) {
            let li = self._createLi(rotate, variant);
            self._$text.append(li);

            rotate += angleDegrees + angleDegrees;

            if (index + 1 === variantsForRenderSectors.length) {
                gradient += variant.color + " 0 ";
            } else {
                gradient += variant.color + " 0 " + endPercent + "%, ";
            }

            endPercent = Math.round(endPercent + angleSectionPercent);
        });

        this._$dram.css('background-image', 'conic-gradient(' + gradient + ')');

        if (variantsForRenderSectors.length <= 1 && this._variantList.lastDrawn.id < 0) {
            this._$block.hide();
        }

    }

    _run(winnerVariant) {
        let self = this;

        if (this._wheel.isRunning) {
            return;
        }

        let variantsForRenderSectors = this._getVariantsForRenderSectors(this._variantList.variants, winnerVariant);

        if (variantsForRenderSectors.length === 1) {
            return;
        }

        let winnerIndex = this._getWinnerIndex(variantsForRenderSectors, winnerVariant);
        let deltaDegrees = this._calculateDeltaDegrees(variantsForRenderSectors, winnerIndex);

        this._wheel.isRunning = true;

        $({deg: 0}).animate({deg: deltaDegrees}, {
            duration: 10000,
            step: function(now) {
                self._$dram.css({
                    transform: 'rotate(' + now + 'deg)'
                });
            },
            complete: function () {
                self._wheel.isRunning = false;
                self._wheel.degrees = deltaDegrees;
                self._eventManager.publish(new Event('variant.randomized', winnerVariant));
            }
        });
    }

    _createLi(rotate, variant) {
        return $('<li></li>')
            .css('transform', 'rotate(' + rotate + 'deg)')
            .html(variant.id + 1);
    }

    _getVariantsForRenderSectors(variants, winnerVariant = null) {
        let filterVariants = [];

        variants.forEach(function (variant) {
            if (!variant.isDrawn || winnerVariant !== null && winnerVariant.id === variant.id) {
                filterVariants.push(variant);
            }
        })
        return filterVariants;
    }

    _template() {
        return "<div class= \"arrow\"></div>\n" +
            "<div class=\"wheel wheel_drum\">\n" +
            "   <ul class=\"wheel_text\">" +
            "   </ul>\n" +
            " </div>";
    }
}