import { createRouter, createWebHistory } from 'vue-router';
import ItemDetail from '../components/views/ItemDetail.vue';
import ItemGroup from '../components/views/ItemGroup.vue';
import ItemUpdate from '../components/views/ItemUpdate.vue';

const routes = [
    {
        path: "/",
        name: "ItemGroup",
        component: ItemGroup,
    },
    {
        path: "/item/:id",
        name: "ItemDetail",
        component: ItemDetail,
    },
    {
        path: "/item-update",
        name: "ItemUpdate",
        component: ItemUpdate,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
export default router