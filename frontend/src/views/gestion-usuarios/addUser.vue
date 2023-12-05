<template>
    <headerComponent></headerComponent>
    <title>Usuarios</title>
    <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body id="adduser">
    <div  class="main-container content padding overlay" >
      <!-- LOGN IN FORM by Omar Dsoky -->
      <form class="user" @submit.prevent="handleSubmit">
         <!--   con = Container  for items in the form-->
         <div class="con">
         <!--     Start  header Content  -->
         <header id="headerUser" class="head-form">
            <h2>Registrar un usuario</h2>
            <!--     A welcome message or an explanation of the login form -->
            <p>Por favor ingresa los datos necesarios</p>
         </header>
         <!--     End  header Content  -->
         <br>
         <div class="field-set">
              <!--   user name Input-->
              <input class="form-inputU" id="txt-input" type="text" placeholder="Nombre(s)" required v-model="name">
              
            <br>
            <input class="form-inputU" id="txt-input2" type="text" placeholder="Apellido(S)" required  v-model="lastname">
           
            <br>
            
            
            <input class="form-inputU" id="txt-input3" type="email" placeholder="@Correo electronico" required  v-model="email">
           
            <br>
            <input class="form-inputU" type="password" placeholder="Contraseña" name="Contraseña" required  v-model="password">
            <br>

            <input class="form-inputU" type="password" placeholder="Confirmar contraseña"  name="Contraseña" required  v-model="repassword">
            


            <select class="form-inputU" id="roles" name="roles" v-model="rol">
              <option value="administrador">Administrador</option>
              <option value="maestro">Maestro</option>
            </select>

  
            <br>

            

      <!--      button LogIn -->
            <button class="registroU"> Registrar </button>
         </div>
      <!--   End Conrainer  -->
        </div>
        
        <!-- End Form -->
      </form>
      </div>
  </body>


  </template>

<script>
import { ref } from 'vue';
import { store } from "@/stores/user-store";
import { useRouter } from "vue-router";
import headerComponent from "@/components/header-component.vue"
import Swal from 'sweetalert2';

export default {
  name: "SubjectSheetsAdd",
  components: {headerComponent},
  setup() {
    const email = ref("");
    const password = ref("");
    const repassword = ref("");
    const name = ref("");
    const lastname = ref("");
    const rol = ref("");
    const router = useRouter();
    const userStore = store();


    

    const handleSubmit = async () => {
  try {
      await userStore.createNewUser(name.value, lastname.value, email.value, password.value, repassword.value, rol.value);
      email.value = "";
      password.value = "";
      repassword.value = "";
      name.value = "";
      lastname.value = "";
      rol.value = "";

      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: '¡Usuario creado con éxito!',
      }).then(() => {
        // Redirige al usuario a la página de inicio después de hacer clic en "Aceptar" en la alerta
        router.push("/Visualizar-usuarios");
      });

      
    
  } catch (error) {
    console.log("desde loginComponents: ", error);
    if (error.error) {
      // eslint-disable-next-line no-undef
      alertError(error.error);
    }
    if (error.errors) {
      // eslint-disable-next-line no-undef
      alertError(error.errors[0].msg);
    }
  }
};

    
    return {
      name,
      email,
      password,
      repassword,
      lastname,
      rol,
      handleSubmit,
    };
  },
};
</script>

<style src="@/assets/css/style.css"></style>
