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
            <router-link :to="{name: 'login'}" class="btn-1 singUp-btn2">Iniciar sesión</router-link>
          </nav>
        </div>
                                                                                                                                           
           </div>
   
   
           <div class="header-content container">
               <div class="content">
                   <h1>La inversión en conocimiento paga el mejor interés</h1>
               </div>
               <img src="@/assets/images/fondodos.png" alt="" class="small-image">
           </div>
       </header>
   
       <main class="services container">
           <div class="service">
               <img src="@/assets/images/icon1.svg" alt="">
               <h3>Servicios </h3>
               <p>
                  Instalación,
                  Servicio de Hosting,
                  Soporte técnico.
               </p>
           </div>
   
           <div class="service">
               <img src="@/assets/images/icon2.svg" alt="">
               <h3>Beneficios</h3>
               <p>
                 Al contratar nuestros servicios, tendrás acceso a todos los beneficios de nuestra página web y al servicio móvil.
               </p>
           </div>
   
           <div class="service">
               <img src="@/assets/images/icon3.svg" alt="">
               <h3> Pagos</h3>
               <p>
                  Pago inicial: $1800

                  Pago mensual: $1000
                 
               </p>
           </div>
       </main>
   
       <section class="portafolios container">
   
           
           <div class="portafolio">
               <img src="@/assets/images/ilustrasion1.svg" alt="">
   
               <div class="portafolio-1">
   
                   <h3>Propósito Central</h3>
                   <p>En LabCare, nos comprometemos a ofrecer soluciones tecnológicas innovadoras
                    para el control de acceso en entornos académicos, facilitando la gestión eficiente de
                    laboratorios, aulas y áreas comunes en universidades  Nuestra misión es
                    proporcionar herramientas que garanticen la seguridad, el orden y la transparencia
                    en el uso de estos espacios, permitiendo un seguimiento preciso de las actividades
                    realizadas por el personal docente y administrativo
                   </p>
               </div>
           </div>
            <br>
            <br>
            <br>
            <br>
           <div class="portafolio">
               <img src="@/assets/images/ilustrasion2.svg" alt="">
               <div class="portafolio-1">
   
                   <h3>Alcance</h3>
                   <p>Desarrollar un sistema de control del espacio de trabajo 
                   para registrar y gestionar actividades y uso de recursos,
                    así como implementar un sistema de control de acceso 
                    para garantizar la seguridad y evitar accesos no autorizados
                   </p>
               </div>
               
   
           </div>
   
       </section>
   
       <footer>
   
           <div class="container">
               <div class="info">
                   <div class="info-content">
   
                       <div class="info-price">
                           <h2>Pagos</h2>
                           <p>Pago Inicial</p>
                           <p class="price">$1800</p>
                           
                           <p>Pago Mensual</p>
                           <p class="price">$1000</p>
                       </div>
                       <div class="info-txt" style="width: 100%; margin: 70px auto 0 auto; text-align: left;">
    <h2>Servicio Y Pagos</h2>
    <p>Ofrecemos servicios de alta calidad para satisfacer todas tus necesidades. 
       Nuestro equipo está comprometido a brindarte el mejor servicio posible, 
       asegurando que cada centavo invertido valga la pena. 
       Si tienes alguna pregunta o necesitas más información, 
       no dudes en contactarnos.
    </p>
    </div>
                   </div>
                   <hr>
                   <div>
                        <h1>Ubicación:</h1>

                        <div><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18568.889146927526!2d-103.52029701190362!3d20.4856686560453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842f55f2173b24d1%3A0xb3fc2b0647d8a722!2sUniversidad%20Tecnol%C3%B3gica%20de%20la%20Zona%20Metropolitana%20de%20Guadalajara!5e0!3m2!1ses!2smx!4v1709657507515!5m2!1ses!2smx" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>

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