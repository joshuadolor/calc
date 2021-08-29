<template>
    <div id="app">
        <Calculator />
    </div>
</template>

<script>
import Calculator from "./components/Calculator";

export default {
    name: "App",
    components: {
        Calculator,
    },
};
</script>

<style>
#app {
    font-family: arial, sans-serif;
    color: #202124;
}
</style>
