<script setup lang="ts">
import { ref, computed } from "vue";
import { useTeamStore } from "@/stores/pokeTeam";


const isDark = ref(false);

const teamStore = useTeamStore();

const teamCount = computed(() => teamStore.team.length);

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  document.body.classList.toggle("dark-theme");
};
</script>

<template>
  <nav class="navbar" :class="{ 'is-dark': isDark }">
    <div class="navbar-content">
      <div class="nav-left">
        <div class="logo" @click="$router.push('/')">
          <img src="@/assets/Pokedex-wiki-logo.png" alt="Logo" />
          <span class="logo-text">Pokédex<span class="dot">.</span></span>
        </div>
      </div>

      <div class="nav-center">
        <div class="nav-links">
          <router-link to="/" class="nav-item">Home</router-link>
          <router-link to="/about" class="nav-item">About</router-link>
          <router-link to="/poketeam" class="nav-item team-link">
            My Team
            <span v-if="teamCount > 0" class="team-badge">
              {{ teamCount }}
            </span>
          </router-link>
        </div>
      </div>

      <div class="nav-right">
        <button
          @click="toggleDarkMode"
          class="theme-toggle"
          :title="isDark ? 'Light Mode' : 'Dark Mode'"
        >
          <svg
            v-if="!isDark"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>

          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;

  /* Efeito de Vidro (Resolve a sobreposição de letras) */
  background-color: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.navbar-content {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
}

/* Estilo da Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}
.logo img {
  height: 40px;
}
.logo-text {
  font-family: "Poppins", sans-serif;
  font-weight: 800;
  font-size: 1.5rem;
  color: #1a1a1a;
  letter-spacing: -0.5px;
}
.dot {
  color: #fb5584;
}

/* Links de Navegação */
.nav-links {
  display: flex;
  gap: 45px;
}
.nav-item {
  text-decoration: none;
  color: #666;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  position: relative;
  transition: color 0.3s ease;
}

/* Indicador Minimalista Ativo/Hover */
.nav-item::after {
  content: "";
  position: absolute;
  bottom: -6px;
  left: 50%;
  width: 0;
  height: 2px;
  background: #fb5584;
  transition: all 0.3s ease;
  transform: translateX(-50%);
  border-radius: 2px;
}

.nav-item:hover::after,
.router-link-active::after {
  width: 18px; /* Traço curto e moderno */
}

.nav-item:hover,
.router-link-active {
  color: #1a1a1a;
}

/* Botão de Tema */
.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  color: #444;
  padding: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: #fb5584;
  transform: rotate(15deg);
}

/* AJUSTES PARA MODO ESCURO (DARK MODE) */
.is-dark.navbar {
  background-color: rgba(18, 18, 18, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.is-dark .logo-text,
.is-dark .nav-item {
  color: #ffffff;
}

.is-dark .nav-item:hover,
.is-dark .router-link-active {
  color: #fb5584;
}

.is-dark .theme-toggle {
  color: #ffffff;
}

.is-dark .theme-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Responsividade */
@media (max-width: 768px) {
  .navbar-content {
    padding: 0 20px;
  }
  .nav-links {
    gap: 20px;
  }
  .logo-text {
    display: none;
  }
}
.team-link {
  display: flex;
  align-items: center;
  gap: 8px;
}

.team-badge {
  background: #FB5584;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 999px;
  min-width: 20px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(251, 85, 132, 0.4);
  animation: pop 0.25s ease;
}

@keyframes pop {
  0% { transform: scale(0.6); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

</style>
