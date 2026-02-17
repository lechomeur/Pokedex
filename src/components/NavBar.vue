<template>
  <nav class="navbar">
    <div class="navbar-content">
      <div class="logo" @click="$router.push('/')">
        <img src="@/assets/Pokedex-wiki-logo.png" alt="Pokedex Logo" />
        <span class="logo-text">Pokédex Wiki</span>
      </div>
      
      <div class="nav-links">
        <router-link to="/" class="nav-item">Home</router-link>
        <router-link to="/team" class="nav-item">My Team</router-link>
        <router-link to="/about" class="nav-item">About</router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #ffffff;
  height: 80px; 
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  width: 100%; 
}

.navbar-content {
  width: 100%;
  max-width: 1400px; 
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px; 
}

.logo {
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.logo:hover {
  transform: scale(1.02);
}

.logo img {
  height: 45px;
}

.logo-text {
  font-weight: 900;
  font-size: 1.4rem;
  color: #2c3e50;
  letter-spacing: -0.5px;
}

.nav-links {
  display: flex;
  gap: 40px; 
}

.nav-item {
  text-decoration: none;
  color: #888;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  position: relative;
}

.nav-item::after {
  content: '';
  position: absolute;
  width: 0;
  height: 3px;
  bottom: -5px;
  left: 0;
  background-color: #FB5584;
  transition: width 0.3s ease;
}

.nav-item:hover::after, 
.router-link-active::after {
  width: 100%;
}

.nav-item:hover, 
.router-link-active {
  color: #FB5584;
}


@media (max-width: 768px) {
  .logo-text {
    display: none; 
  }
  .nav-links {
    gap: 20px;
  }
}
</style>