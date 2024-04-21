let Event = require('./module/client/core/Event');
let EventManager = require('./module/client/core/EventManager');
let ColorStack = require('./module/client/data/ColorsStack');
let State = require('./module/client/data/State');
let StateStorage = require('./module/client/data/StateStorage');
let Variant = require('./module/client/dto/Variant');
let VariantList = require('./module/client/dto/VariantList');
let Wheel = require('./module/client/dto/Wheel');
let ApplicationView = require('./module/client/view/ApplicationView');
let InformationView = require('./module/client/view/InformationView');
let UserInterfaceView = require('./module/client/view/UserInterfaceView');
let VariantListView = require('./module/client/view/VariantListView');
let WheelView = require('./module/client/view/WheelView');
let WheelApplication = require('./module/WheelApplication');
let Bayes = require('./module/client/bayes/Bayes');

function createWheel(id, title) {
    let stateStorage = new StateStorage(id);

    stateStorage.load().then(state => {
        let view = $('#' + id);
        let eventManager = new EventManager();
        let colorStack = new ColorStack();

        let applicationView = new ApplicationView(
            view, title, eventManager, state
        );
        let variantList = new VariantListView(id, view, title, eventManager, state.variantList);
        let wheelView = new WheelView(view, eventManager, state.variantList, state.wheel);
        let userInterfaceView = new UserInterfaceView(view, eventManager);
        let informationView = new InformationView(view, eventManager, state.variantList.lastDrawn);

        new WheelApplication(
            eventManager,
            stateStorage,
            colorStack,
            state
        );
    });
}

function createBayes() {
    let bayes = new Bayes();
}

createWheel('i-want-it','Колесо важных дел');
createWheel('i-wish-it','Колесо Хочух');
createBayes();

