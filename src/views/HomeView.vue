<template>
  <main class="home-container">
    <header class="hero-section">
      <div class="hero-text">
        <h1>What Pokémon are you looking for?</h1>
        <p>Search for Pokémon by name or type to build your ultimate team.</p>
      </div>
      
      <div class="search-wrapper">
        <input type="text" placeholder="Search Pokémon..." class="search-input" />
      </div>
    </header>

    <div v-if="loading" class="loading">Loading...</div>
    
    <div v-else class="pokemon-grid">
      <PokemonCard v-for="poke in pokemonList" :key="poke.id" :pokemon="poke" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PokemonCard from '@/components/PokemonCard.vue';

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

const pokemonList = ref<Pokemon[]>([]);
const loading = ref(true);

const fetchPokemons = async () => {
  try {
    loading.value = true;
    // 1. Fetch the initial list (first 20)
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=21');
    const data = await response.json();

    // 2. Fetch details for each pokemon to get images and types
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
  width: 100%;
}

.hero-section {
  padding: 60px 20px;
  text-align: left;
}

.hero-text h1 {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1d1d1f;
  margin-bottom: 8px;
}

.hero-text p {
  color: #86868b;
  font-size: 1.1rem;
  margin-bottom: 24px;
}

.search-input {
  width: 100%;
  max-width: 500px;
  padding: 15px 25px;
  border-radius: 30px;
  border: none;
  background: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  font-size: 1rem;
  outline: none;
}

.header h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 30px;
  color: #333; 
}

.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 25px;
  width: 100%;
  margin-top: 40px;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  margin-top: 50px;
}

@media (max-width: 600px) {
  .pokemon-grid {
    grid-template-columns: 1fr;
  }
}
</style>