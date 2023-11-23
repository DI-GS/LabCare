/*Paquetes de vue-router*/
import { createRouter, createWebHistory } from 'vue-router';

/*Components imports*/
import subjectSheets from '@/views/hojas-asignatura/subjectSheetsAdd.vue'
import viewSchedules from '@/views/gestion-horarios/viewSchedules.vue'
import schedulesAdd from '@/views/gestion-horarios/schedulesAdd.vue'
import ViewUsers from '@/views/gestion-usuarios/viewUsers.vue'
import ViewInicio from '@/views/inicio-de-sesion/signUp.vue'
import ViewLogin from '@/views/inicio-de-sesion/loginUser.vue'
import ViewInformativa from '@/views/inicio-de-sesion/pagina_principal.vue'
import subjectSheetsView from '@/views/hojas-asignatura/subjectSheetsView.vue'
import header from '@/components/header-component.vue'

//Creación de rutas
const routes = [
    { path: '/', component: ViewInformativa },
    { path: '/:pathMatch(.*)*', component: ViewInformativa },
    { path: '/Visualizar-usuarios', name: 'ViewUsers', meta:{auth:true}, component: ViewUsers},
    { path: '/Visualizar-horarios', name: 'schedulesView', meta:{auth:true}, component: viewSchedules },
    { path: '/Visualizar-horarios/Agregar-horario', name: 'schedulesAdd', meta:{auth:true}, component: schedulesAdd },
    { path: '/Visualizar-formularioInicio', name: 'formulario_i', component: ViewInicio},
    { path: '/Iniciar-sesion', name: 'login', component: ViewLogin},
    { path: '/Visualizar-hoja-asignatura', name: 'subjectSheetsView', meta:{auth:true}, component: subjectSheetsView },
    { path: '/Visualizar-hoja-asignaturan/Agregar-hoja-asignatura', name: 'subjectSheetsAdd', meta:{auth:true}, component: subjectSheets },
    { path: '/home', name: 'home', meta:{auth:true}, component: header},
];

//Configuración del router
const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router 