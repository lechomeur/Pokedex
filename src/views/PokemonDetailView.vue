<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { getPokemonAbility } from "../services/pokeapi";

const route = useRoute();
const pokemon = ref(null);

onMounted(async () => {
  const res = await getPokemonAbility(route.params.id);
  pokemon.value = res.data;
});
</script>

<template>
  <div v-if="pokemon" class="p-4">
    <h1>{{ pokemon.name }}</h1>
    <p>{{ pokemon.effect }}</p>
  </div>
</template>
