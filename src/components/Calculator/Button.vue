<template>
    <div
        :class="'btn ' + additionalClass"
        role="button"
        @click="click"
        v-html="text"
        :style="cosmetics"
    ></div>
</template>

<script>
export default {
    name: "CalcButton",
    data() {
        return {
            additionalClass: "",
        };
    },
    methods: {
        click() {
            if (!this.value) return;
            this.$emit("input", this.value);
        },
    },
    props: {
        cosmetics: {},
        text: {
            required: true,
        },
        value: {
            required: true,
        },
    },
    mounted() {
        if (this.cosmetics?.backgroundColor) {
            this.additionalClass = "btn-plain";
        }
    },
};
</script>

<style scoped>
.btn {
    line-height: 34px;
    cursor: pointer;
    box-sizing: border-box;
    position: relative;
    border-radius: 4px;
    background-color: #dadce0;
    place-items: center;
    font-size: 13px;
    align-self: center;
    outline: 0;
    width: 100%;
    user-select: none;
    height: 38px;
    display: flex;
    align-content: center;
    justify-content: center;
    padding: 15px 0;
    border: thin solid transparent;
}

.btn.btn-plain:active {
    border-color: #dadce0;
}

.btn:active {
    box-shadow: 0 1px 6px rgb(32 33 36 / 28%);
    outline-offset: -6px;
    border: thin solid #70757a;
}
</style>

<style >
.btn sup {
    margin-bottom: 10px;
}
</style>