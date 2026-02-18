<template>
  <div
    class="pokemon-card"
    :style="cardStyle"
    @click="$router.push(`/pokemon/${pokemon.id}`)"
  >
    <div class="card-bg-icon"></div>

    <div class="card-info">
      <span class="pokemon-id">#{{ formatId(pokemon.id) }}</span>
      <h3 class="pokemon-name">{{ pokemon.name }}</h3>

      <div class="types-container">
        <span v-for="type in pokemon.types" :key="type" class="type-badge">
          {{ type }}
        </span>
      </div>
    </div>

    <div class="image-container">
      <img :src="pokemon.image" :alt="pokemon.name" />
    </div>
    <div class="card-actions">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { typeColors } from "@/utils/colors";

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

const props = defineProps<{
  pokemon: Pokemon;
}>();

const formatId = (id: number) => id.toString().padStart(3, "0");

// background dinâmico
const cardStyle = computed(() => {
  const primaryType = props.pokemon.types?.[0]?.toLowerCase() || "normal";
  const color = typeColors[primaryType] || typeColors.normal;

  return {
    background: `radial-gradient(circle at top right, ${color}, rgba(0,0,0,0.1))`,
  };
});
</script>

<style scoped>
.pokemon-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 24px;
  padding: 24px;
  color: white;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  min-height: 160px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
}

.pokemon-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.2);
}

.card-bg-icon {
  position: absolute;
  right: -20px;
  bottom: -20px;
  width: 140px;
  height: 140px;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 10C27.9 10 10 27.9 10 50s17.9 40 40 40 40-17.9 40-40S72.1 10 50 10zm0 10c14.2 0 26.1 9.9 29.2 23.3H63.5c-2.4-5.3-7.7-9-13.5-9s-11.1 3.7-13.5 9H20.8C23.9 29.9 35.8 20 50 20zm0 60c-14.2 0-26.1-9.9-29.2-23.3H36.5c2.4 5.3 7.7 9 13.5 9s11.1-3.7 13.5-9h15.7C76.1 70.1 64.2 80 50 80zm0-24.3c-3.1 0-5.7-2.6-5.7-5.7s2.6-5.7 5.7-5.7 5.7 2.6 5.7 5.7-2.6 5.7-5.7 5.7z' fill='rgba(255,255,255,0.15)'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  z-index: 0;
}

.pokemon-id {
  font-weight: 900;
  font-size: 1.1rem;
  opacity: 0.4;
  margin-bottom: 5px;
  display: block;
}

.pokemon-name {
  text-transform: capitalize;
  font-size: 1.8rem;
  font-weight: 800;
  margin: 0 0 15px 0;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.types-container {
  display: flex;
  gap: 8px;
}

.type-badge {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(4px);
  padding: 6px 16px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: capitalize;
}

.image-container img {
  width: 130px;
  height: 130px;
  object-fit: contain;
  filter: drop-shadow(5px 10px 15px rgba(0,0,0,0.2));
  transition: transform 0.3s ease;
  z-index: 1;
  position: relative;
}

.pokemon-card:hover .image-container img {
  transform: scale(1.1) rotate(5deg);
}

.card-info { z-index: 1; }
</style>
