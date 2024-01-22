import { createRouter, createWebHistory } from 'vue-router'
import NotFoundView from '@/views/NotFoundView.vue'
import ConverterView from '@/views/ConverterView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'converter',
            meta: { title: 'Currencies | Converter' },
            component: ConverterView
        },
        {
            path: '/rates',
            name: 'rates',
            meta: { title: 'Currencies | Rates' },
            component: () => import('../views/RatesView.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            meta: { title: 'Currencies | Not Found' },
            component: NotFoundView
        }
    ]
})

const DEFAULT_TITLE = 'Currencies'
router.beforeEach((to, from, next) => {
    document.title = to.meta.title || DEFAULT_TITLE
    next()
})

export default router
