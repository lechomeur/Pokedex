<template>
  <div 
    class="pokemon-card" 
    :style="{ backgroundColor: mainColor }"
    @click="$router.push(`/pokemon/${pokemon.id}`)"
  >
    <div class="card-info">
      <span class="pokemon-id">#{{ formatId(pokemon.id) }}</span>
      <h3 class="pokemon-name">{{ pokemon.name }}</h3>
      
      <div class="types-container">
        <span 
          v-for="type in pokemon.types" 
          :key="type" 
          class="type-badge"
        >
          {{ type }}
        </span>
      </div>
    </div>

    <div class="image-container">
      <img :src="pokemon.image" :alt="pokemon.name" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { typeColors } from '@/utils/colors';

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

const props = defineProps<{
  pokemon: Pokemon
}>();

const mainColor = computed(() => {
  const primaryType = props.pokemon.types?.[0]?.toLowerCase() || 'normal';
  return typeColors[primaryType] || '#ccc';
});

const formatId = (id: number) => id.toString().padStart(3, '0');
</script>

<style scoped>
.pokemon-card {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  padding: 24px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-height: 110px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.pokemon-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
}

.pokemon-id {
  position: absolute;
  right: 15px;
  top: 10px;
  font-weight: 800;
  font-size: 1.2rem;
  opacity: 0.2;
}

.pokemon-name {
  text-transform: capitalize;
  font-size: 1.4rem;
  font-weight: bold;
  margin: 0 0 10px 0;
  text-align: left;
}

.types-container {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.type-badge {
  background: rgba(255, 255, 255, 0.25);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  width: fit-content;
  text-transform: capitalize;
}

.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-container img {
  width: 90px;
  height: 90px;
  object-fit: contain;
  filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.1));
}
</style>