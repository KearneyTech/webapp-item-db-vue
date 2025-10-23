import { defineStore } from 'pinia'
import type { Item } from '../types/item';

export const useCurrentItemStore = defineStore('currentItem', {
    state: ()=>({
        currentItem: null as Item | null,
    }),
    getters: {
        getItem: (state) => state.currentItem
    },
    actions: {
        setItem(value: Item) {
            console.log(`Store setItem ${value.title}`);
            this.currentItem = value;
        }        
    }
});