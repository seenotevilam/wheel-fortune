module.exports = class EventManager {
    subscribe(eventName, fn) {
        $(this).bind(eventName, fn);
    }

    publish(event) {
        $(this).trigger(event.name, event);
    }
}
