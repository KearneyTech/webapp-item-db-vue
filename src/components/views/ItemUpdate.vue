<!--
::Description::
This is the item's update page.
/s How is this not going to turn into a huge editorial flow? The media update is kinda blind shot in the dark.

::TODOs::
Create v Update
Accept local item object for update.
Upload media, multiple files?
How to delete/update media (unassociate files w/ item)?
Category select.
Clean up handleSubmit switching between POST or PUT
    id undefined!?! Really!?!
-->
<template>
    <section class="view">
        <h3>ItemUpdate</h3>
        <div class="grid mt-2 w-56">
            <form @submit.prevent="handleSubmit">
            <label>
                Title
                <input type="text" v-model="currentItem.title" />
            </label>
            <label>
                Subtitle
                <input type="text" v-model="currentItem.subtitle" />
            </label>
            <label>
                Location
                <input type="text" />
            </label>
            <label>
                Price
                <input type="text" />
            </label>
            <label>
                Category
                <input type="text" />
            </label>
            <label>
                Condition
                <input type="text" />
            </label>
            <label>
                Description
                <textarea v-model="currentItem.description"></textarea>
            </label>
            <label>
                Media
                <input type="file" id="file" @change="handleUpload"/>
            </label>
            <button type="submit">Update</button>
            </form>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Item } from '../../types/item';
import { useCurrentItemStore } from '../../stores';
import router from '../../routing';

export default defineComponent({
    name: 'ItemUpdate',
    data() {
        return {
            title: '',
            subtitle: '',
            description: '',
            currentItem: {} as Item,
            file: null as File | null
        };
    },
    mounted() {
        const storeCurrentItem = useCurrentItemStore().getItem;
        if (storeCurrentItem == null) {
            console.log(`Update found current item is null.`);
        } else {
            this.currentItem = storeCurrentItem;
            console.log(`Found something ${this.currentItem.title}`);
        }
    },
    methods: {
        handleUpload(event: any) {
            console.log(event.target.files);
            const target = event.target as HTMLInputElement;
            const uploadedFile = target.files?.[0] ?? null;

            if(uploadedFile) {
                this.file = uploadedFile;
            }

            console.log(target);
            console.log(uploadedFile);
        },
        async handleSubmit() {
            // This method will update the database with the form content.
            // This view is used to enter new items and update existing items.

            const REQUEST_URL = 'http://localhost:7010/api/default';
            let REQUEST_METHOD = '';
            const form = new FormData();
            form.append('title', this.currentItem.title);
            form.append('subtitle', this.currentItem.subtitle);
            form.append('description', this.currentItem.description);

            console.log(
                `ItemUpdate handleSubmit: currentItem.id ${this.currentItem.id}`
            );

            if(this.file !== null) {
                form.append('file', this.file);
                console.log(`ItemUpdate handleSubmit: including file`);
            }

            if (typeof this.currentItem.id === 'undefined') {
                // Create via POST
                REQUEST_METHOD = 'POST';
            } else {
                // Update via PUT
                REQUEST_METHOD = 'PUT';
                form.append('id', JSON.stringify(this.currentItem.id));
            }

            try {
                const response = await fetch(REQUEST_URL, {
                    method: REQUEST_METHOD,
                    body: form
                });

                if (!response.ok) {
                    throw new Error('Response was not OK');
                }

                const result = await response.json();
                const items = JSON.parse(result);
                const currentItemID = items[0]?.id;

                console.log('Raw: ', items[0]);
                console.log('JSON: ', JSON.stringify(items[0]));
                console.log('Success: ', currentItemID);
                console.log('Logic: ', typeof currentItemID === 'undefined');

                const storeCurrentItem = useCurrentItemStore();
                storeCurrentItem.setItem(this.currentItem);

                if (typeof currentItemID === 'undefined') {
                    router.push('/');
                } else {
                    router.push(`/item/${currentItemID}`);
                }
            } catch (error) {
                console.error('Form Submit Error: ', error);
            }
        }
    }
});
</script>

<style lang="scss">
label {
    margin: 0.5em;
    display: flex;
    flex-direction: column;
}
input,
textarea {
    border: 1px solid white;
}
</style>
