<script setup lang="ts">
</script>

<template>
    <section class="itemdb-app flex flex-col mx-auto">
        <div class="app-nav mb-2 space-x-3">
            <a href="/">Home</a>
            <a href="/item/2">Item 2</a>
            <a href="/item-update">Update</a>
        </div>
        <h2 class="m-2">Item Database</h2>
        <router-view />
    </section>
</template>

<style lang="scss">
.itemdb-app {
    width: 90vw;
    display: flex;
    place-items: start;
    min-width: 320px;
    min-height: 100vh;
    padding: 1em;

    @include min-width(1024px) {
        width: 66vw;
    }
}
</style>
