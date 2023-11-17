/*Paquetes de vue-router*/
import { createRouter, createWebHistory } from 'vue-router';

/*Components imports*/
import headerComponent from '@/components/header-component.vue'
import subjectSheets from '@/views/hojas-asignatura/subjectSheetsAdd.vue'
import viewSchedules from '@/views/gestion-horarios/viewSchedules.vue'
import schedulesAdd from '@/views/gestion-horarios/schedulesAdd.vue'
import ViewUsers from '@/views/gestion-usuarios/viewUsers.vue'
import ViewInicio from '@/views/inicio-de-sesion/formulario_i.vue'
import ViewInformativa from '@/views/inicio-de-sesion/pagina_principal.vue'
import subjectSheetsView from '@/views/hojas-asignatura/subjectSheetsView.vue'


const routes = [
    { path: '/', component: ViewInformativa },
    { path: '/:pathMatch(.*)*', component: ViewInformativa },
    { path: '/Visualizar-usuarios', name: 'ViewUsers', component: ViewUsers},
    { path: '/Visualizar-horarios', name: 'schedulesView', component: viewSchedules },
    { path: '/Visualizar-horarios/Agregar-horario', name: 'schedulesAdd', component: schedulesAdd },
    { path: '/Visualizar-hoja-asignatura', name: 'subjectSheetsView', component: subjectSheetsView },
    { path: '/Visualizar-hoja-asignatura/Agregar-hoja-asignatura', name: 'subjectSheetsAdd', component: subjectSheets },
    { path: '/Visualizar-formularioInicio', name: 'formulario_i', component: ViewInicio},
      

];

//Configuración del router
const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router 