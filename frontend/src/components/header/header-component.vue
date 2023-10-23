<template>
  <header id="header">
    <nav>
      <div class="navbar">
        <div class="logo">
          <router-link to="/" title="Inicio" rel="home" class="header__logo"
            ><img
              src="https://tlajomulco.gob.mx/sites/default/files/logo-pope.png"
              alt="Inicio"
              class="header__logo-image"
          /></router-link>
        </div>
        <ul class="menu">
          <li><router-link :to="{ name: 'login' }">Ingresar</router-link></li>
          <li>
            <router-link :to="{ name: 'signup' }">Registrarte</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "headerComponent",
};
</script>

<style scoped src="@/assets/css/style.css"></style>
