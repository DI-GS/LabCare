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
      <form class="user">
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
              <input class="form-inputU" id="txt-input" type="text" placeholder="Nombre(s)" required>
              
            <br>
            <input class="form-inputU" id="txt-input" type="text" placeholder="Apellido(S)" required>
           
            <br>
            
            
            <input class="form-inputU" id="txt-input" type="email" placeholder="@Correo electronico" required>
           
            <br>
                 <!--   Password -->
            <!--   Password Input-->
            <input class="form-inputU" type="password" placeholder="Password" id="pwd"  name="Contraseña" required>

            <br>

            <select class="form-inputU" id="txt-input" type="text" placeholder="Selecciona el tipo" required></select>
  
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

import headerComponent from '@/components/header-component.vue';

export default {
  name: "SubjectSheetsAdd",
  components: {headerComponent},

  setup() {
    

    return{
      
    }
    
  },


};
//Investigar para que sirve ref en vue
</script>

<style src="@/assets/css/style.css"></style>
