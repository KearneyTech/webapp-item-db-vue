<!--
::Description::
This is basically the homepage. The user is initally presented with a collection of items they have entered. Click an item will update the view with item's detail page.

::TODOs::
Replace fetch with axios.
Where should data calls go?
Where does the user functionality go?
Standardize file comments template.
Create project API docs -agent?
Update Node dependencies.
AI task, check for latest Node vulnerabilities.
Navigation?
New project.
Server side rendering.
Sort feature to prioritize/pin/highlight/category items, auto and manual.
No media option (generic image, maybe represent categories).
-->
<template>
    <section class="view">
        <h3 class="flex justify-center">ItemGroup</h3>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error" class="bg-white text-red-700 font-bold">{{ error }}</div>
        <div v-else class="flex flex-wrap justify-center gap-2">
            <div v-for="item in items" :key="item.id" class="item border w-64 h-48">
                <h4 class="font-bold text-2xl">
                    <router-link :to="`/item/${item.id}`">
                        {{ item.title }}
                    </router-link>
                </h4>
                <p class="text-base">{{ item.subtitle }}</p>
                <p class="text-gray-500 text-ls">{{ item.description }}</p>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Item } from '../../types/item';

export default defineComponent({
    name: 'ItemGroup',
    data(){
        return {
            items: <Item[]>[],
            loading: false,
            error: null
        };
    },
    methods: {
        async fetchItems() {
            this.loading = true;
            this.error = null;

            try {
                const response = await fetch("http://localhost:7010/api/default");

                if(!response.ok) {
                    throw new Error("Response not ok.");
                }

                this.items = await response.json();
            } catch(error: any) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        }
    },
    mounted() {
        this.fetchItems();
    }
});
</script>

<style lang="scss">
.item {
    margin-top: 1em;
    padding: 1.5em;
    border: 1px solid white;
    border-left: none;
    border-right: none;
}
</style>