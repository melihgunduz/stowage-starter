import {createRouter, createWebHistory} from '@ionic/vue-router';
import {RouteRecordRaw} from 'vue-router';
import HomePage from '../views/HomePage.vue'
import ManagementPage from "@/views/ManagementPage.vue";
import actionControl from "@/components/actionControl.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/manage',
        name: 'Management',
        component: ManagementPage
    },
    {
        path: '/manage/:action/control',
        name: 'Control',
        component: actionControl,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
