<template>
    <body>
       <header>
           <div class="menu container">
   
               
               <input type="checkbox" id="menu">
               <label for="menu">
               </label>
   
               <div class="menu">
          <nav class="navbar">
            <ul>
              <!-- Puedes agregar elementos de menú aquí si es necesario -->
            </ul>
            <div class="labcare">Lab<span class="highlight">Care</span></div>
            <router-link :to="{name: 'formulario_i'}" class="btn-1 login-btn">Registrarse</router-link>
            <router-link :to="{name: 'login'}" class="btn-1 login-btn2">Iniciar sesión</router-link>
          </nav>
        </div>
                                                                                                                                           
           </div>
   
   
           <div class="header-content container">
               <div class="content">
                   <h1>Lorem ipsum ipsum sit</h1>
                   <p>
                       Lorem ipsum dolor sit awet consectetur
                   </p>
                   <a href="#" class="btn-1">Mas informacion</a>
                   <a href="#" class="btn-1">Mas informacion</a>
               </div>
               <img src="@/assets/images/fondodos.png" alt="" class="small-image">
           </div>
       </header>
   
       <main class="services container">
           <div class="service">
               <img src="@/assets/images/icon1.svg" alt="">
               <h3>Servicio 1</h3>
               <p>
                   Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta tempore magnam odio id ex blanditiis
                   officia placeat,
               </p>
           </div>
   
           <div class="service">
               <img src="@/assets/images/icon2.svg" alt="">
               <h3>Servicio 2</h3>
               <p>
                   Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta tempore magnam odio id ex blanditiis
                   officia placeat,
               </p>
           </div>
   
           <div class="service">
               <img src="@/assets/images/icon3.svg" alt="">
               <h3>Servicio 3</h3>
               <p>
                   Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta tempore magnam odio id ex blanditiis
                   officia placeat,
               </p>
           </div>
       </main>
   
       <section class="portafolios container">
   
           <h2>Portafolios</h2>
           <div class="portafolio">
               <img src="@/assets/images/ilustrasion1.svg" alt="">
   
               <div class="portafolio-1">
   
                   <h3>portafolio 1</h3>
                   <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis jdsfpakjakjafja
                       ahdfojasojdfaowsjdfajdfakjodfokjdalkfjsljfajfjasjfkldawsjdf
                       ANSDJFDASNOGAOSXJXIJM;OD
                   </p>
                   <a href="#" class="btn-2">Informacion</a>
               </div>
           </div>
            <br>
            <br>
            <br>
            <br>
           <div class="portafolio">
               <img src="@/assets/images/ilustrasion2.svg" alt="">
               <div class="portafolio-1">
   
                   <h3>portafolio 2</h3>
                   <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis jdsfpakjakjafja
                       ahdfojasojdfaowsjdfajdfakjodfokjdalkfjsljfajfjasjfkldawsjdf
                       ANSDJFDASNOGAOSXJXIJM;OD
                   </p>
                   <a href="#" class="btn-2">Informacion</a>
               </div>
               
   
           </div>
   
       </section>
   
       <footer>
   
           <div class="container">
               <div class="info">
                   <div class="info-content">
   
                       <div class="info-price">
                           <h2>costo</h2>
                           <p class="price">$5000</p>
                           <p>kwfadsjklgnsaklnmdflkasdnmf</p>
                       </div>
                       <div class="info-txt">
                           <h2>Princing list</h2>
                           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ipsam non iure porro
                               
                           </p>
                           <a href="#" class="btn-1">informacion</a>
                       </div>
                   </div>
                   <hr>
                   <div class="enlaces">
                       <h3>logo</h3>
                       <div class="enlace">
                           <li><a href="#">lorem</a></li>
                           <li><a href="#">lorem</a></li>
                           <li><a href="#">lorem</a></li>
                       </div>
                   </div>
               </div>
   
           </div>
   
       </footer>
   
   
   </body>
     </template>
     
     <script>
     // Importa el archivo de estilos directamente
    
     
     export default {
       // Resto del componente
     };
     </script>
     
     <style scoped>
     /* Estilos específicos del componente aquí */
   
     /* También puedes importar estilos desde un archivo externo */
     @import url('@/assets/css/pagina_informativa.css');
   </style>