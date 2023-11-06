/*Paquetes de vue-router*/
import { createRouter, createWebHistory } from 'vue-router';

/*Components imports*/
import headerComponent from '@/components/header-component.vue'
import subjectSheets from '@/views/hojas-asignatura/agregar-hoja.vue'
//Creación de rutas
const routes = [
    { path: '/', component: headerComponent },
    { path: '/:pathMatch(.*)*', component: headerComponent },
    { path: '/Agregar-hoja-asignatura', component: subjectSheets },
];


//Configuración del router
const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router 