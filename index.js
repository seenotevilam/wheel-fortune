let Event = require('./module/core/Event');
let EventManager = require('./module/core/EventManager');
let ColorStack = require('./module/data/ColorsStack');
let State = require('./module/data/State');
let StateStorage = require('./module/data/StateStorage');
let Variant = require('./module/dto/Variant');
let VariantList = require('./module/dto/VariantList');
let Wheel = require('./module/dto/Wheel');
let ApplicationView = require('./module/view/ApplicationView');
let InformationView = require('./module/view/InformationView');
let UserInterfaceView = require('./module/view/UserInterfaceView');
let VariantListView = require('./module/view/VariantListView');
let WheelView = require('./module/view/WheelView');
let WheelApplication = require('./module/WheelApplication');


function createWheel(id, title) {
    let view = $('#' + id);
    let stateStorage = new StateStorage(id);
    let state = stateStorage.load();
    let eventManager = new EventManager();
    let colorStack = new ColorStack();

    let applicationView = new ApplicationView(
        view, title, eventManager, state
    );
    let variantList = new VariantListView(id, view, title, eventManager, state.variantList);
    let wheelView = new WheelView(view, eventManager, state.variantList, state.wheel);
    let userInterfaceView  = new UserInterfaceView(view, eventManager);
    let informationView = new InformationView(view, eventManager, state.variantList.lastDrawn);

    new WheelApplication(
        view,
        title,
        eventManager,
        stateStorage,
        colorStack,
        state
    );
}

createWheel('i-want-it','Колесо важных дел');
createWheel('i-wish-it','Колесо Хочух');


