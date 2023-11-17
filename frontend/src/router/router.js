/*Paquetes de vue-router*/
import { createRouter, createWebHistory } from 'vue-router';

/*Components imports*/
import headerComponent from '@/components/header-component.vue'
import subjectSheets from '@/views/hojas-asignatura/subjectSheetsAdd.vue'
import viewSchedules from '@/views/gestion-horarios/viewSchedules.vue'
import schedulesAdd from '@/views/gestion-horarios/schedulesAdd.vue'
import ViewUsers from '@/views/gestion-usuarios/viewUsers.vue'
import subjectSheetsView from '@/views/hojas-asignatura/subjectSheetsView.vue'

//Creación de rutas
const routes = [
    { path: '/', component: headerComponent },
    { path: '/:pathMatch(.*)*', component: headerComponent },
    { path: '/Visualizar-usuarios', name: 'ViewUsers', component: ViewUsers},
    { path: '/Visualizar-horarios', name: 'schedulesView', component: viewSchedules },
    { path: '/Visualizar-horarios/Agregar-horario', name: 'schedulesAdd', component: schedulesAdd },
    { path: '/Visualizar-hoja-asignatura', name: 'subjectSheetsView', component: subjectSheetsView },
    { path: '/Visualizar-horarios/Agregar-hoja-asignatura', name: 'subjectSheetsAdd', component: subjectSheets },

];

//Configuración del router
const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router 