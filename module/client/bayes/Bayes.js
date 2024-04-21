let Calculator = require('/module/client/bayes/Calculator');
let ProbabilityEvent = require('/module/client/bayes/ProbabilityEvent');

module.exports = class Bayes
{
    constructor() {
        this.$ProbabilityEventAValue = $("#ProbabilityEventAValue");
        this.ProbabilityEventBValue = $("#ProbabilityEventBValue");

        this.$ProbabilityEventAPercent = $("#ProbabilityEventAPercent");
        this.$ProbabilityEventBPercent = $("#ProbabilityEventBPercent");
        this.$ProbabilityEventBAPercent = $("#ProbabilityEventBAPercent");

        this.$ProbabilityResult = $("#ProbabilityResult");

        let self = this;

        $(document).on('click','#ProbabilityEventCalculatorButton',function(event){
            event.preventDefault();
            event.stopPropagation();
            self.onCalculate();
        });
    }

    onCalculate() {
        let ProbabilityEventAName = this.$ProbabilityEventAValue.val();
        let ProbabilityEventBName = this.ProbabilityEventBValue.val();

        let ProbabilityEventAPercent = this.$ProbabilityEventAPercent.val();
        let ProbabilityEventBPercent = this.$ProbabilityEventBPercent.val();
        let ProbabilityEventBAPercent = this.$ProbabilityEventBAPercent.val();

        let ProbabilityEventA = new ProbabilityEvent(ProbabilityEventAName, ProbabilityEventAPercent);
        let ProbabilityEventB = new ProbabilityEvent(ProbabilityEventBName, ProbabilityEventBPercent);
        let ProbabilityEventBA = new ProbabilityEvent(ProbabilityEventBName, ProbabilityEventBAPercent, ProbabilityEventAName);

        this.calculator = new Calculator(ProbabilityEventA, ProbabilityEventB, ProbabilityEventBA);
        this.$ProbabilityResult.show();
        this.$ProbabilityResult.html(this.calculator.calculate().getDescription());
    }
}
