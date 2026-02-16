<script setup>
import { onMounted, ref } from "vue";
import { getPokemons } from "../services/pokeapi.js";
import PokemonCard from "../components/PokemonCard.vue";

const pokemons = ref([]);
const getIdFromUrl = (url) => {
  const parts = url.split("/").filter(Boolean)
  return parts[parts.length - 1]
}
onMounted(async () => {
  const res = await getPokemons();

  pokemons.value = res.data.results.map((p) => ({
    name: p.name,
    image: `https://img.pokemondb.net/sprites/home/normal/${p.name}.png`,
    id: getIdFromUrl(p.url),
  }));
});
</script>

<template>
  <div class="grid grid-cols-2 gap-4 p-4">
    <PokemonCard v-for="p in pokemons" :pokemon="p" />
  </div>
</template>
