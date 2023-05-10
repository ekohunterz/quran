//import vue router
import { createRouter, createWebHistory } from 'vue-router'

//define a routes
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import( /* webpackChunkName: "home" */ '../views/home.vue')
    },
    {
        path: '/detail/:id',
        name: 'detail',
        component: () => import( /* webpackChunkName: "edit" */ '../views/detail.vue')
    }
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes // <-- routes,
})

export default router