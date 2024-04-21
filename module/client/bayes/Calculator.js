let ProbabilityEvent = require('/module/client/bayes/ProbabilityEvent');

module.exports = class Calculator
{
    constructor(probabilityA, probabilityB, probabilityBA) {
        this.probabilityA = probabilityA instanceof ProbabilityEvent ? probabilityA : null;
        this.probabilityB = probabilityB instanceof ProbabilityEvent ? probabilityB : null;
        this.probabilityBA = probabilityBA instanceof ProbabilityEvent ? probabilityBA : null;

        if (probabilityA === null || probabilityB === null || probabilityBA === null) {
            throw new Error("Logic exception probability can not be null");
        }
    }

    calculate() {
        let percent
            = Math.round(this.probabilityBA.getPercent() * this.probabilityA.getPercent() / this.probabilityB.getPercent());

        return new ProbabilityEvent(this.probabilityA.getName(), percent, this.probabilityB.getName());
    }
}
