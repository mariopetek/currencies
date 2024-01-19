import { createRouter, createWebHistory } from 'vue-router'
import NotFoundView from '@/views/NotFoundView.vue'
import ConverterView from '@/views/ConverterView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: ConverterView
        },
        {
            path: '/rates',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/RatesView.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            component: NotFoundView
        }
    ]
})

export default router
