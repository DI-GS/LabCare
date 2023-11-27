<template>
    <body>
      <div class="container-form register" v-show="!showLoginForm">
        <div class="information">
          <div class="info-childs">
            <h3>Lab<span class="care">Care</span></h3>
            <p>
              Si ya tienes una cuenta, simplemente presiona el botón de "Iniciar
              Sesión" para acceder a tu cuenta. Ingresa tus credenciales de
              inicio de sesión
            </p>
            <input type="button" value="Iniciar Sesión" id="button1" @click="toggleForm('login')">
          </div>
        </div>
        <div class="form-information">
          <div class="form-information-childs">
            <h2>Crear una Cuenta</h2>
            <div class="icons">
              <form class="form" @submit.prevent="handleSubmit">
                <label class="input-label">
                  <i class='bx bx-user'></i>
                  <input
                    type="text"
                    v-model="name"
                    placeholder="Nombre"
                    class="input-field"
                    required
                  />
                </label>
                <label class="input-label">
                  <i class='bx bx-user'></i>
                  <input
                    type="text"
                    v-model="lastname"
                    placeholder="Apellidos"
                    class="input-field"
                    required
                  />
                </label>
                <label class="input-label">
                  <i class='bx bx-envelope'></i>
                  <input
                    type="email"
                    v-model="email"
                    required
                    placeholder="Correo Electrónico"
                    class="input-field"
                  />
                </label>
                <label class="input-label">
                  <i class='bx bx-lock'></i>
                  <input
                    type="password"
                    v-model="password"
                    required
                    placeholder="Contraseña"
                    class="input-field"
                  />
                </label>
                <label class="input-label">
                  <i class='bx bx-lock'></i>
                  <input
                    type="password"
                    v-model="repassword"
                    required
                    placeholder="Confirmar contraseña"
                    class="input-field"
                  />
                </label>
                <input
                  type="submit"
                  value="Registrarse"
                  class="submit-button"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </body>
  </template>
  
  <script>
import { ref } from 'vue';
import { store } from "@/stores/user-store";
import { useRouter } from "vue-router";
export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const repassword = ref("");
    const name = ref("");
    const lastname = ref("");
    const correoLogin = ref('');
    const contrasenaLogin = ref('');
    const showLoginForm = ref(false);
    const router = useRouter();
    const userStore = store();


    

    const handleSubmit = async () => {
  try {
      await userStore.register(name.value, lastname.value, email.value, password.value, repassword.value);
      email.value = "";
      password.value = "";
      repassword.value = "";
      name.value = "";
      lastname.value = "";
      router.push("/");
    
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
      correoLogin,
      contrasenaLogin,
      showLoginForm,
      handleSubmit,
    };
  },
};
</script>
  
  <style scoped>
    /* Estilos específicos del componente aquí como consumir una api axes en vue */
  
    /* También puedes importar estilos desde un archivo externo */
    @import url('@/assets/css/formulario-inicio.css');
  </style>
  