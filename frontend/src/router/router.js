/*Paquetes de vue-router*/
import { createRouter, createWebHistory } from 'vue-router';

/*Components imports*/
import subjectSheets from '@/views/hojas-asignatura/subjectSheetsAdd.vue'
import viewSchedules from '@/views/gestion-horarios/viewSchedules.vue'
import schedulesAdd from '@/views/gestion-horarios/schedulesAdd.vue'
import ViewUsers from '@/views/gestion-usuarios/viewUsers.vue'
import viewPago from '@/views/pagos/pago.vue'
import Pago from '@/views/pagos/pago.vue'
import SuccessfulPayment from '@/views/pagos/SuccessfulPayment.vue';

import AddUser from '@/views/gestion-usuarios/addUser.vue'
import ViewInicio from '@/views/inicio-de-sesion/signUp.vue'
import ViewLogin from '@/views/inicio-de-sesion/loginUser.vue'
import ViewInformativa from '@/views/inicio-de-sesion/pagina_principal.vue'
import subjectSheetsView from '@/views/hojas-asignatura/subjectSheetsView.vue'
import header from '@/components/header-component.vue'
import subjectAdd from '@/views/gestion-clases/subjectAdd.vue'
import subjectView from '@/views/gestion-clases/subjectView.vue'
import ViewGraphics from '@/views/graficas/viewGraphics.vue'
import ViewClassrooms from '@/views/gestion-aulas/ViewClassrooms.vue'
import AddClassrooms from '@/views/gestion-aulas/AddClassrooms.vue'
import ViewReportes from '@/views/reportes-pdf/informes.vue'


//Creación de rutas
const routes = [
    { path: '/', name: "/", component: ViewInformativa },
    { path: '/:pathMatch(.*)*', component: ViewInformativa },
    { path: '/Visualizar-usuarios', name: 'ViewUsers', meta:{auth:true}, component: ViewUsers},
    { path: '/Visualizar-horarios', name: 'schedulesView', meta:{auth:true}, component: viewSchedules },
    { path: '/Visualizar-horarios/Agregar-horario', name: 'schedulesAdd', meta:{auth:true}, component: schedulesAdd },
    { path: '/Visualizar-usuarios/Agregar-usuario', name: 'addUser', meta:{auth:true}, component: AddUser},
    { path: '/Visualizar-formularioInicio', name: 'formulario_i', component: ViewInicio},
    { path: '/Iniciar-sesion', name: 'login', component: ViewLogin},
    { path: '/Visualizar-hoja-asignatura', name: 'subjectSheetsView', meta:{auth:true}, component: subjectSheetsView },
    { path: '/Visualizar-hoja-asignaturan/Agregar-hoja-asignatura', name: 'subjectSheetsAdd', meta:{auth:true}, component: subjectSheets },
    { path: '/home', name: 'home', meta:{auth:true}, component: header},
    { path: '/Realizar-pago', name: 'Pago', component: Pago },
    { path: '/Visualizar-pagos', name: 'ViewPago', component: viewPago},
    { path: '/successful-payment', component: SuccessfulPayment },
    { path: '/Agregar-clase', name: 'subjectAdd', meta:{auth:true}, component:subjectAdd},
    { path: '/Visualizar-clases', name: 'subjectView', meta:{auth:true}, component:subjectView},
    { path: '/Visualizar-graficas', name: 'ViewGraphics', meta:{auth:true}, component: ViewGraphics},
    { path: '/Visualizar-aulas', name: 'ViewClassrooms',meta:{auth:true}, component: ViewClassrooms},
    { path: '/Visualizar-aulas/Agregar-aula', name: 'AddClassrooms', meta:{auth:true}, component: AddClassrooms},
    { path: '/informes', name: 'reportes-pdf', meta:{auth:true}, component: ViewReportes}


];

//Configuración del router
const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router 