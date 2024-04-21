let ProbabilityEvent = require('/module/client/bayes/ProbabilityEvent');

module.exports = class Calculator
{
    constructor(probabilityA, probabilityB, probabilityBA) {
        this.probabilityA = probabilityA instanceof ProbabilityEvent ? probabilityA : null;
        this.probabilityB = probabilityB instanceof ProbabilityEvent ? probabilityB : null;
        this.probabilityBA = probabilityBA instanceof ProbabilityEvent ? probabilityBA : null;
    }

    calculate() {
        let percent
            = this.probabilityBA.getPercent() * this.probabilityA.getPercent() / this.probabilityB.getPercent();

        console.log(this.probabilityBA.getPercent());
        console.log(this.probabilityB.getPercent());
        console.log(this.probabilityA.getPercent());


        return new ProbabilityEvent(this.probabilityA.getName(), percent, this.probabilityB.getName());
    }
}
