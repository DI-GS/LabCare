/*Paquetes de vue-router*/
import { createRouter, createWebHistory } from 'vue-router';

/*Components imports*/
import headerComponent from '@/components/header-component.vue'
//Creación de rutas
const routes = [
    { path: '/', component: headerComponent },
    { path: '/:pathMatch(.*)*', component: headerComponent },
];


//Configuración del router
const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router 