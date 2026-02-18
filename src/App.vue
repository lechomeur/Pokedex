<template>
  <div class="app-container">
    <Navbar />
    <div class="page-content">
      <router-view />
    </div>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/NavBar.vue';
import TheFooter from '@/components/Footer.vue';
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body, html {
  width: 100%;
  min-height: 100vh;
  color: #2c3e50;
  background-color: #f6f8fc;
  transition: background-color 0.4s ease, color 0.4s ease;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 10C27.9 10 10 27.9 10 50s17.9 40 40 40 40-17.9 40-40S72.1 10 50 10zm0 10c14.2 0 26.1 9.9 29.2 23.3H63.5c-2.4-5.3-7.7-9-13.5-9s-11.1 3.7-13.5 9H20.8C23.9 29.9 35.8 20 50 20zm0 60c-14.2 0-26.1-9.9-29.2-23.3H36.5c2.4 5.3 7.7 9 13.5 9s11.1-3.7 13.5-9h15.7C76.1 70.1 64.2 80 50 80zm0-24.3c-3.1 0-5.7-2.6-5.7-5.7s2.6-5.7 5.7-5.7 5.7 2.6 5.7 5.7-2.6 5.7-5.7 5.7z' fill='rgba(0,0,0,0.04)'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  /* Posicionamos ela bem grande saindo um pouco da tela à direita */
  background-position: calc(100% + 160px) -160px; 
  background-attachment: fixed;
  background-size: 850px; 
}


/* Modo Dark - pokeball */
body.dark-theme {
  background-color: #0b0e14; 
  color: #f1f1f1;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 10C27.9 10 10 27.9 10 50s17.9 40 40 40 40-17.9 40-40S72.1 10 50 10zm0 10c14.2 0 26.1 9.9 29.2 23.3H63.5c-2.4-5.3-7.7-9-13.5-9s-11.1 3.7-13.5 9H20.8C23.9 29.9 35.8 20 50 20zm0 60c-14.2 0-26.1-9.9-29.2-23.3H36.5c2.4 5.3 7.7 9 13.5 9s11.1-3.7 13.5-9h15.7C76.1 70.1 64.2 80 50 80zm0-24.3c-3.1 0-5.7-2.6-5.7-5.7s2.6-5.7 5.7-5.7 5.7 2.6 5.7 5.7-2.6 5.7-5.7 5.7z' fill='rgba(255,255,255,0.05)'/%3E%3C/svg%3E");
}

.dark-theme h1, 
.dark-theme .logo-text {
  color: #ffffff;
  text-shadow: 0 0 20px rgba(255,255,255,0.05);
}

.dark-theme input {
  background-color: rgba(255, 255, 255, 0.08) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: white !important;
}

.dark-theme input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.app-container {
  width: 100%;
  min-height: 100vh;
}

.page-content {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  position: relative;
  z-index: 2; 
}

router-view {
  flex: 1; /* Isso empurra o footer para baixo */
}
</style>