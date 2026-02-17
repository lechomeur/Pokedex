<template>
  <main class="home-container">
    <header class="hero-section">
      <div class="hero-text">
        <h1>What Pokémon are you looking for?</h1>
        <p>Search for Pokémon by name or type to build your ultimate team.</p>
      </div>
      
      <div class="search-wrapper">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search Pokémon..." 
          class="search-input" 
        />
      </div>
    </header>

    <div v-if="loading" class="loading">Loading...</div>
    
    <div v-else class="pokemon-grid">
      <PokemonCard 
        v-for="poke in filteredPokemon" 
        :key="poke.id" 
        :pokemon="poke" 
      />
    </div>

    <div v-if="filteredPokemon.length === 0 && !loading" class="no-results">
      No Pokémon found with that name.
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import PokemonCard from '@/components/PokemonCard.vue';

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

const pokemonList = ref<Pokemon[]>([]);
const searchQuery = ref(''); 
const loading = ref(true);

const filteredPokemon = computed(() => {
  return pokemonList.value.filter(poke => {
    return poke.name.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});

const fetchPokemons = async () => {
  try {
    loading.value = true;
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151'); 
    const data = await response.json();

    const detailPromises = data.results.map(async (p: any) => {
      const res = await fetch(p.url);
      const details = await res.json();
      
      return {
        id: details.id,
        name: details.name,
        image: details.sprites.other['official-artwork'].front_default,
        types: details.types.map((t: any) => t.type.name)
      };
    });

    pokemonList.value = await Promise.all(detailPromises);
  } catch (error) {
    console.error("Error fetching pokemons:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchPokemons);
</script>

<style scoped>

.home-container {
  --text-title: #1d1d1f;
  --text-p: #666;
  --input-bg: white;
  --input-border: transparent;
  --input-text: #333;
  width: 100%;
}

:global(body.dark-theme) .home-container {
  --text-title: #ffffff;
  --text-p: rgba(255, 255, 255, 0.6);
  --input-bg: rgba(255, 255, 255, 0.07);
  --input-border: rgba(255, 255, 255, 0.1);
  --input-text: white;
}

.hero-section { padding: 80px 0 40px 0; text-align: left; }

.hero-text h1 {
  font-size: 3.2rem;
  font-weight: 800;
  color: var(--text-title); 
  margin-bottom: 12px;
  letter-spacing: -1.5px;
  line-height: 1.1;
  transition: color 0.4s ease;
}

.hero-text p {
  color: var(--text-p); 
  font-size: 1.2rem;
  margin-bottom: 35px;
  max-width: 600px;
  line-height: 1.6;
  transition: color 0.4s ease;
}

.search-input {
  width: 100%;
  max-width: 450px;
  padding: 18px 30px;
  border-radius: 20px;
  font-size: 1.1rem;
  outline: none;
  transition: all 0.3s ease;
  
  background: var(--input-bg);
  border: 2px solid var(--input-border);
  color: var(--input-text);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
}

.search-input:focus {
  border-color: #FB5584;
  transform: translateY(-2px);
}

.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); 
  gap: 30px;
  margin-top: 60px;
}

/* Auxiliares */
.loading, .no-results {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: #FB5584;
  margin-top: 100px;
}

@media (max-width: 768px) {
  .hero-text h1 { font-size: 2.2rem; }
  .hero-section { padding: 40px 20px; }
  .pokemon-grid { grid-template-columns: 1fr; }
}
</style>