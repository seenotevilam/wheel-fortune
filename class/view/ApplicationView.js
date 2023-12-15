class ApplicationView {
    constructor(id, title, eventManager, state) {
        this._$view  = $('#' + id);
        this._$view.html(this._template());
        this._eventManager = eventManager;
        this._variantList = state.variantList;

        new VariantListView(id, this._$view, title, this._eventManager, this._variantList);
        new WheelView(this._$view, this._eventManager, this._variantList, state.wheel);
        new UserInterfaceView(this._$view, this._eventManager, state.isBlocked);
        new InformationView(this._$view, this._eventManager, state.variantList.lastDrawn);
    }

    _template() {
        return "  <div class=\"section-title col-lg-12 col-md-12 \" role=\"alert\">\n" +
            "                <h4 class=\"Alert\" style=\"color: #e53637\">Выпало </h4>\n" +
            "            </div>\n" +
            "            <div style=\"clear: both\"></div>\n" +
            "            <div class=\"col-lg-7 col-md-7\">\n" +
            "                <div class=\"anime__details__title\">\n" +
            "                    <h3 class=\"Title\"></h3>\n" +
            "                </div>\n" +
            "                <div class=\"anime__details__btn\">\n" +
            "                    <label class=\"form-label\">\n" +
            "                        <input class=\"form-control addNewVariantInput\">\n" +
            "                    </label>\n" +
            "                    <button href=\"#\" class=\"follow-btn  addNewVariantButton\"><span>Добавить</span>\n" +
            "                        <i class=\"fa fa-angle-right\"></i>\n" +
            "                    </button>\n" +
            "                </div>\n" +
            "                <div class=\"anime-details anime__details__btn\">\n" +
            "                    <ul class=\"list list-group list-group-numbered\">\n" +
            "                        <div class=\"anime__review__item\">\n" +
            "                            <li class=\"anime__review__item__text list-group-item d-flex justify-content-between align-items-start\">\n" +
            "                                <div style=\"margin-bottom: 0; margin-top: 10px;\" class=\"section-title\">\n" +
            "                                    <h5 class=\"label\">Вариант 1</h5>\n" +
            "                                </div>\n" +
            "                                <label style=\"display:none;\" class=\"id\">0</label>\n" +
            "                                <button href=\"#\" class=\"follow-btn deleteVariantButton\">\n" +
            "                                    Удалить</button>\n" +
            "                            </li>\n" +
            "                        </div>\n" +
            "                    </ul>\n" +
            "                </div>\n" +
            "            </div>\n" +
            "            <div class=\"col-lg-5 col-md-5 text-center anime__details__title text-center\">\n" +
            "                <div class=\"anime__details__sidebar wheel_block\">\n" +
            "                    <div class=\"wheel_drum_container\">\n" +
            "                       <div class=\"wheel wheel_drum\">\n" +
            "                           <ul class=\"wheel_text\"></ul>\n" +
            "                       </div>\n" +
            "                    </div>\n" +
            "                    <div style=\"clear: both\"></div>\n" +
            "                    <div class=\"anime__details__btn\">\n" +
            "                        <button href=\"\" class=\"randomVariantButton disabled follow-btn\"><i class=\"fa fa-heart-o\"></i>\n" +
            "                            Крутите барабан</button>\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "            </div>";
    }
}