class WheelView {
    constructor(element, eventManager, state) {
        this._eventManager = eventManager;
        this.state = state;
        this._variantList = state.variantList;
        this.isRunning = false;
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
            self.state.wheelDegrees = 0;
            self._update();
        });

        this._eventManager.subscribe('variant.deleted', function (event, eventData) {
            let variant = eventData.value;
            if (variant.hasPicked && variant.id !== self._variantList.lastPicked.id) {
                return;
            }
            self.state.wheelDegrees = 0;
            self._update();
        });

        this._eventManager.subscribe('variant.randomize', function (event, eventData) {
            let variant = eventData.value;
            self.state.wheelDegrees = 0;
            self._update();
            self._run(variant);
        });
    }

    _update() {
        let variantsForRenderSectors = this._getVariantsForRenderSectors(this._variantList.variants);
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

        if (variantsForRenderSectors.length <= 1) {
            this._$block.hide();
            return;
        }

        this._$block.show();
        this._$wheelContainer.html(this._template());
        this._$dram = $(this._$wheelContainer.find('.wheel_drum').get(0));
        this._$dram.css('transform', 'rotate(' + this.state.wheelDegrees + 'deg)')

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
    }

    _run(winnerVariant) {
        let self = this;

        if (this.isRunning) {
            return;
        }

        let variantsForRenderSectors = this._getVariantsForRenderSectors(this._variantList.variants);

        if (variantsForRenderSectors.length === 1) {
            return;
        }

        let winnerIndex = this._getWinnerIndex(variantsForRenderSectors, winnerVariant);
        let deltaDegrees = this._calculateDeltaDegrees(variantsForRenderSectors, winnerIndex);

        this.isRunning = true;

        $({deg: 0}).animate({deg: deltaDegrees}, {
            duration: 10000,
            step: function(now) {
                self._$dram.css({
                    transform: 'rotate(' + now + 'deg)'
                });
            },
            complete: function () {
                self.isRunning = false;
                self.state.wheelDegrees = deltaDegrees;
                winnerVariant.hasPicked = true;
                self._eventManager.publish(new Event('variant.randomized', winnerVariant));
            }
        });
    }

    _createLi(rotate, variant) {
        return $('<li></li>')
            .css('transform', 'rotate(' + rotate + 'deg)')
            .html(variant.label);
    }

    _getVariantsForRenderSectors(variants) {
        let self = this;
        let filterVariants = [];

        variants.forEach(function (variant) {
            let isVariantForView = !variant.hasPicked ||
                (self._variantList.lastPicked !== null && self._variantList.lastPicked.id === variant.id);

            if (isVariantForView) {
                filterVariants.push(variant);
            }
        })
        return filterVariants;
    }

    _template() {
        return "<div class=\"arrow\"></div>\n" +
            "<div class=\"wheel wheel_drum\">\n" +
            "   <ul class=\"wheel_text\">" +
            "   </ul>\n" +
            " </div>";
    }
}