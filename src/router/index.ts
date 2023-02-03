import {createRouter, createWebHistory} from '@ionic/vue-router';
import {RouteRecordRaw} from 'vue-router';
import TabsPage from "@/views/TabsPage.vue";
import actionControl from "@/components/actionControl.vue"

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/tabs/warehouse'
    },
    {
        path: '/tabs',
        component: TabsPage,
        children: [
            {
                path: '',
                redirect: '/tabs/warehouse'
            },
            {
                path: 'warehouse',
                component: () => import('@/views/HomePage.vue')
            },
            {
                path: 'management',
                component: () => import('@/views/ManagementPage.vue'),
            },
        ]
    },
    {
        path: '/tabs/management/:action/control',
        name: 'Control',
        component: actionControl
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
