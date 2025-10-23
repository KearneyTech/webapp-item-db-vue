<!--
::Description::
This is the item's detail page.

::TODOs::
Link to update
Pass local item object for update
-->
<template>
    <section class="view">
        <h3>ItemDetail</h3>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error" class="grid mt-2 w-56 text-gray-500">{{ error }}</div>
        <div v-else class="grid mt-2 w-56 text-gray-500">
            <h4>Title <span class="text-white">{{ item.title }}</span></h4>
            Subtitle <span class="text-white">{{ item.subtitle }}</span><br/>
            Location<br/>
            Price<br/>
            Category<br/>
            Condition<br/>
            Description <span class="text-white">{{ item.description }}</span><br/>
            Media
        </div>
        <div>
            <!--<router-link :to="`/item-update`">Edit</router-link>-->
            <a v-on:click="handleEdit">Edit</a>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import router from '../../routing';
import type { Item } from '../../types/item';
import {useCurrentItemStore} from '../../stores';

export default defineComponent({
    name: 'ItemDetail',
    data() {
        return {
            item: {} as Item,
            loading: false,
            error: null,
            itemID: ""
        }
    },
    methods: {
        async fetchItem() {
            this.loading = true;
            this.error = null;

            try {
                const response = await fetch(`http://localhost:7010/api/default/${this.itemID}`);

                if(!response.ok) {
                    throw new Error("Response not ok.");
                }

                this.item = await response.json();
            } catch (error: any) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        handleEdit() {
            const storeCurrentItem = useCurrentItemStore();
            console.log(`ItemDetail handleEdit ${this.item.title}`);
            storeCurrentItem.setItem(this.item);
            router.push('/item-update');
        }
    },
    mounted() {
        const route = useRoute();
        const param = route.params.id;

        if(Array.isArray(param)) {
            if(typeof param[0] !== "undefined") {
                this.itemID = param[0]?.toString();
            }
        } else if (typeof param === "string") {
            this.itemID = param;
        }

        this.fetchItem();
    }
});
</script>

<style lang="scss">
</style>