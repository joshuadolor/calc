const operators = ['+', '-', '*', '/'];

class Calculator {
    constructor() {
        this.stack = [];
        this._result = 0;
        this._lastEquation = '';
    }

    get result() {
        return this._result;
    }

    get lastEquation() {
        return this._lastEquation;
    }

    entry(val) {
        const isAnOperator = operators.indexOf(val) > -1;

        if (this.stack[0] == 0) {
            if (val == 0) {
                return this.equation;
            }

            if (isAnOperator) {
                if (val == '-') {
                    this.stack = [val];
                }
            }
        }

        if (this.isLastEntryOperator && isAnOperator) {
            this.stack.pop();
        }

        const [temp] = [...this.stack]
            .join('')
            .split(/[(+|*|\-|/)]/g)
            .reverse();

        if (temp.indexOf('.') !== -1 && val === '.') {
            return this.equation;
        }

        this.stack.push(val);

        return this.equation;
    }

    get equation() {
        const literalMap = new Map([
            ['+', () => ' + '],
            [
                '-',
                (lastElem) => {
                    if (
                        operators.indexOf(lastElem) > -1 ||
                        lastElem === undefined
                    )
                        return ' -';

                    return ' - ';
                },
            ],
            ['*', () => ' × '],
            ['/', () => ' ÷ '],
        ]);
        const equation = this.stack
            .map((s, k) => {
                const lastItem = this.stack[k - 1];
                return literalMap.has(s) ? literalMap.get(s)(lastItem) : s;
            })
            .join('');
        return equation;
    }

    clear() {
        this.stack = [];
    }

    compute() {
        if (!this.isLastEntryOperator) {
            try {
                const val = Math.round(eval(this.stack.join('')) * 1e15) / 1e15;
                this._lastEquation = this.equation;
                this.stack = [val];
                return val;
            } catch (e) {
                this.clear();
                return 'Error';
            }
        }
    }

    get isLastEntryOperator() {
        return operators.indexOf(this.lastEntry) > -1;
    }

    get lastEntry() {
        return this.stack.length > 0 ? this.stack[this.stack.length - 1] : null;
    }
}

export default Calculator;
