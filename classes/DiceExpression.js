/**
 * Accept D&D style dice expressions and calculates them.
 */
class DiceExpression {

    /**
     * Creates a DiceExpression object.
     * @constructor 
     * @param {string} expression A D&D style dice expression.
     */
    constructor(expression) {
        expression = this.#trimExpression(expression);
        this.expression = expression;
    }

    /**
     * Trims the expression by removing spaces and uppercases.
     * @method #trimExpression 
     * @param {String} expression A D&D style dice expression.
     */
    #trimExpression(expression) {
        expression = expression.toLowerCase();
        expression = expression.replaceAll(' ', '');
        return expression;
    }

    /**
     * Returns the result of the Dice Expression by rolling the dice.
     * @method getRoll
     */
    getRoll() {
        let dicePattern = /[0-9]*d[0-9]+/g;
        let matchedDice = this.expression.match(dicePattern);
        let rolledExpression = this.expression
        for (let i in matchedDice) {
            let rolledDice = this.#roll(matchedDice[i]);
            rolledExpression = rolledExpression.replaceAll(matchedDice[i], rolledDice);
        }
        let result = this.#calculate(rolledExpression);
        return result;
    }

    /**
     * Returns the result of the expression by getting the mean of the dice.
     * @method getMean
     */
    getMean() {
        let dicePattern = /[0-9]*d[0-9]+/g;
        let matchedDice = this.expression.match(dicePattern);
        let rolledExpression = this.expression
        for (let i in matchedDice) {
            let rolledDice = this.#mean(matchedDice[i]);
            rolledExpression = rolledExpression.replaceAll(matchedDice[i], rolledDice);
        }
        let result = this.#calculate(rolledExpression);
        return result;
    }

    /**
     * Returns the roll of a XdY string.
     * @method #roll
     * @param {string} diceString a single-dice expression.
     * @return {number} Rolled result of single-dice expression.
     */
    #roll(diceString) {
        let dice = diceString.split("d");
        if (dice[0] == "") { dice[0] = "1" }
        dice[0] = parseInt(dice[0]);
        dice[1] = parseInt(dice[1]);
        let diceSum = 0;
        for (let j = 0; j < dice[0]; j++) {
            let rolledDice = Math.floor(Math.random() * dice[1]) + 1;
            diceSum = diceSum + rolledDice;
        }
        return diceSum;
    }

    /**
     * Returns the mean a XdY string.
     * @method #mean
     * @param {string} diceString a single-dice expression.
     * @return {number} Mean of single-dice expression.
     */
    #mean(diceString) {
        let dice = diceString.split("d");
        if (dice[0] == "") { dice[0] = "1" }
        dice[0] = parseInt(dice[0]);
        dice[1] = parseInt(dice[1]);
        let diceSum = (Math.floor(dice[1] / 2) + 1) * dice[0];
        return diceSum;
    }

    /**
     * Returns the sum of the expression.
     * @method #calculate
     * @param {string} expression a math expression.
     * @return {number} Result of the math expression.
     */
    #calculate(expression) {
        let result = eval(expression);
        return result;
    }

}