<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { getPokemonDetails } from "../services/pokeapi";

const route = useRoute();
const pokemon = ref(null);       
const abilities = ref([]);
const species = ref("");
onMounted(async () => {
  const res = await getPokemonDetails(route.params.name);
  pokemon.value = {
    name: res.name,
    image: `https://img.pokemondb.net/sprites/home/normal/${res.name}.png`,
  };
  abilities.value = res.abilities.map(a => a.ability.name);
  species.value = res.species.name;
});
</script>

<template>
  <div v-if="pokemon">
    <h2>{{ pokemon.name }}</h2>
    <img :src="pokemon.image" class="w-24 mx-auto" />

    <h3>Capacités :</h3>
    <ul>
      <li v-for="ability in abilities" :key="ability">
        {{ ability }}
      </li>
    </ul>
      <h3>Espèce :</h3>
    <p>{{ species }}</p>
  </div>
</template>
