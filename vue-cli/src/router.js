import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { 
            name: 'SearchResultPage',
            path: '/result/:page',
            component: ()=> import('./components/searchResultPage.vue')
        }
    ]
}) 

export default router