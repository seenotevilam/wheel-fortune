module.exports = class ProbabilityEvent {

    constructor(eventFirstName, percent = 0, eventSecondName = null) {
        this.eventFirstName  = eventFirstName;
        this.eventSecondName  = eventSecondName;

        percent = parseFloat(percent);

        if (typeof (percent) !== "number") {
            throw new Error("Percent must be integer");
        }

        this.percent = percent;

        if (this.percent < 0) {
            throw new Error("Percent must be equals more 0");
        }

    }

    getName()
    {
        if (this.eventSecondName === null) {
            return this.eventFirstName;
        }

        return this.eventFirstName + " / " + this.eventSecondName;
    }

    getFirstName()
    {
        return this.eventFirstName;
    }

    getSecondName()
    {
        return this.eventSecondName;
    }

    getPercent()
    {
        return this.percent;
    }

    getDescription()
    {
        if (this.eventSecondName == null) {
            return "Вероятность " + this.eventFirstName + " равна " + this.percent + "%";
        }

        return "Вероятность \" "
            + this.eventFirstName + " \" при \" " + this.eventSecondName
            + " \" равна " + this.percent + "%" ;
    }
}
