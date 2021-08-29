<template>
    <div class="result-box" @focus="test">
        <div>
            <div class="equation">
                <transition name="emphasis" :key="equation" mode="out-in">
                    <div v-if="equation">{{ equation }}</div>
                </transition>
            </div>
            <div class="result">{{ result }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ResultBox",
    props: {
        equation: {
            default: "",
        },
        result: {
            default: 0,
        },
    },
    methods: {
        test() {
            console.log(123);
        },
    },
};
</script>
<style >
#calculator:hover .result-box {
    box-shadow: 0px 1px 1px 1px rgb(231, 231, 231) inset;
    border-top: 1px solid #202124;
}

.emphasis-enter-active {
    animation: textgrowth 0.15s;
}

@keyframes textgrowth {
    0% {
        font-size: 50px;
    }
    100% {
        font-size: 13px;
    }
}
</style>
<style scoped>
.result-box {
    user-select: none;
    height: 60px;
    line-height: 1;
    padding: 0;
    font-size: medium;
    font-weight: normal;
    border: 1px solid #ebebeb;
    border-radius: 8px;
    padding: 10px 14px;
    margin-bottom: 10px;
    display: flex;
    width: 100%;
    overflow: hidden;
}

.result-box div {
    flex: 1;
    align-self: center;
    overflow: hidden;
}

.equation {
    min-height: 20px;
    color: #70757a;
    font-size: 13px;
    position: relative;
    width: 100%;
    line-height: 1;
    margin-top: 3px;
    margin-bottom: 5px;
}

.equation div {
    user-select: text;
    float: right;
    overflow: hidden;
    white-space: nowrap;
}

.result {
    user-select: text;
    float: right;
    overflow: hidden;
    white-space: nowrap;
    font-size: 30px;
}
</style>