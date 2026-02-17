<template>
  <div class="app-container">
    <Navbar />
    <div class="page-content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/NavBar.vue';
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  background-color: #f6f8fc; 
}

.app-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-content {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;    
  padding: 20px;
  box-sizing: border-box;
}
</style>