<template>
    <div id="calculator">
        <h2>Calculator</h2>
        <ResultBox :equation="equation" :result="result" />
        <div class="buttons-container">
            <CalcButton
                v-for="(btn, k) of btns"
                :key="k"
                ref="btn"
                :cosmetics="btn.style"
                :text="btn.text"
                :value="btn.value"
                @input="handleClick"
            />
        </div>
    </div>
</template>

<script>
import CalcButton from "./Button";
import ResultBox from "./ResultBox";
import { functionButtons, equationButtons } from "@/config/buttons";
import Calculator from "./Calculator";

export default {
    name: "Calculator",
    components: {
        CalcButton,
        ResultBox,
    },
    data() {
        return {
            equation: "",
            result: "0",
            calc: new Calculator(),
            didCompute: false,
        };
    },
    methods: {
        handleClick(value) {
            const performMap = new Map([
                [
                    "CE",
                    () => {
                        this.calc.clear();
                        this.result = 0;
                        this.equation = `Ans = ${this.result}`;
                    },
                ],
                [
                    ".",
                    () => {
                        this.didCompute = false;
                        if (this.calc.lastEntry !== ".") {
                            this.result = this.calc.entry(value);
                        }
                        if (this.calc.equation) {
                            this.equation = `Ans = ${this.calc.equation}`;
                        }
                    },
                ],
                [
                    "=",
                    () => {
                        if (
                            !this.didCompute &&
                            !this.calc.isLastEntryOperator
                        ) {
                            this.result = this.calc.compute();
                        }

                        this.equation = null;
                        this.$nextTick(() => {
                            if (this.calc.equation) {
                                this.equation = `${this.calc.lastEquation} =`;
                            }
                        });
                        this.didCompute = true;
                    },
                ],
            ]);
            const perform = performMap.has(value);

            if (perform) {
                performMap.get(value)();
            } else {
                this.didCompute = false;
                this.result = this.calc.entry(value);
                if (this.calc.equation) {
                    this.equation = `Ans = ${this.calc.equation}`;
                }
            }
        },
    },
    computed: {
        btns() {
            return [...functionButtons, ...equationButtons].sort(
                (a, b) => a.order - b.order
            );
        },
    },
};
</script>

<style scoped>
#calculator {
    width: 650px;
    margin: 0 auto;
}

.buttons-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 90.4px);
    grid-row-gap: 8px;
    grid-column-gap: 8px;
}
</style>