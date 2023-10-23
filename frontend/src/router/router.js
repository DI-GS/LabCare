/*Paquetes de vue-router*/
import { createRouter, createWebHistory } from 'vue-router';

/*Components imports*/
import header from '@/components/header/header-component.vue'
//Creación de rutas
const routes = [
    { path: '/', component: header },
    { path: '/:pathMatch(.*)*', component: header },
];


//Configuración del router
const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router 