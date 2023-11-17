<template>
    <body>
     <div class="container-form register" v-show="!showLoginForm">
       <div class="information">
           <div class="info-childs">
               <h3>Lab<span class="care">Care</span></h3>
               <p>
                   Si ya tienes una cuenta, simplemente presiona el botón de "Iniciar Sesión" para acceder a tu cuenta.
                    Ingresa tus credenciales de inicio de sesión
               </p>
               <input type="button" value="Iniciar Sesión" id="button1">
           </div>
       </div>
       <div class="form-information">
           <div class="form-information-childs">
               <h2>Crear una Cuenta</h2>
               <div class="icons">
                   <form class="form" action="procesar_registro.php" method="post">
                       <label class="input-label">
                           <i class='bx bx-user'></i>
                           <input type="text" name="nombre" id="nombre" placeholder="Nombre Completo" class="input-field">
                       </label>
                       <label class="input-label">
                           <i class='bx bx-envelope'></i>
                           <input type="email" name="correo" id="correo1" placeholder="Correo Electrónico" class="input-field">
                       </label>
                       <label class="input-label">
                           <i class='bx bx-lock'></i>
                           <input type="password" name="contrasena" id="contrasena" placeholder="Contraseña" class="input-field">
                       </label>
                       <input type="submit" value="Registrarse" class="submit-button">
                   </form>
               </div>
           </div>
       </div>
   </div>
   
   <div class="container-form loging hide">
       <div class="information">
           <div class="info-childs">
               <h3>Lab<span class="care">Care</span></h3>
               <p>Si aún no has creado una cuenta, te invitamos a presionar el botón de registro.
               </p>
               <input type="button" value="Registrarse" id="sign-up">
           </div>
       </div>
       <div class="form-information">
           <div class="form-information-childs">
               <h2>Iniciar Sesión</h2>
               <div class="icons">
                   <form class="form" action="procesar_login.php" method="post">
                       <label class="input-label">
                           <i class='bx bx-envelope'></i>
                           <input type="email" name="correo" id="correo2" placeholder="Correo Electrónico" class="input-field">
                       </label>
                       <label class="input-label">
                           <i class='bx bx-lock'></i>
                           <input type="password" name="contrasena" id="contrasena2" placeholder="Contraseña" class="input-field">
                       </label>
                       <input type="submit" value="Iniciar Sesión" class="submit-button">
                   </form>
               </div>
           </div>
       </div>
   </div>
   
    </body>
   </template>
   
   
   <script>
   export default {
     data() {
       return {
         nombre: '',
         correo: '',
         contrasena: '',
         correoLogin: '',
         contrasenaLogin: '',
         showLoginForm: false,
       };
     },
     methods: {
       toggleForm(formType) {
         this.showLoginForm = formType === 'login';
       },
       register() {
         console.log('Registro:', this.nombre, this.correo, this.contrasena);
       },
       login() {
         console.log('Inicio de Sesión:', this.correoLogin, this.contrasenaLogin);
       },
     },
   
     
   };
   </script>
   
   <style scoped>
     /* Estilos específicos del componente aquí como consumir una api axes en vue */
   
     /* También puedes importar estilos desde un archivo externo */
     @import url('@/assets/css/formulario-inicio.css');
   </style>