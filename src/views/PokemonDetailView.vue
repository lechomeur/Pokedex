<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { getPokemonDetails, getAbilityEffect } from "../services/pokeapi";

const route = useRoute();

const pokemon = ref<{ name: string; image: string } | null>(null);
const abilities = ref<string[]>([]);
const types = ref<string[]>([]);
const species = ref("");
const height = ref(0);
const weight = ref(0);

// ✅ accessible dans le template
const abilityEffectsFR = ref<Record<string, string>>({});

onMounted(async () => {
  const res = await getPokemonDetails(route.params.name as string);

  pokemon.value = {
    name: res.name,
    image: `https://img.pokemondb.net/sprites/home/normal/${res.name}.png`,
  };

  abilities.value = res.abilities.map(a => a.ability.name);
  species.value = res.species.name;
  types.value = res.types.map(t => t.type.name);
  height.value = res.height / 10;
  weight.value = res.weight / 10;

  const abilityEffects = await Promise.all(
    res.abilities.map(a => getAbilityEffect(a.ability.name))
  );

  abilityEffects.forEach((abilityData, index) => {
    const fr = abilityData.effect_entries.find(
      e => e.language.name === "fr"
    );

    if (fr && res.abilities[index]) {
      const abilityName = res.abilities[index].ability.name;
      abilityEffectsFR.value[abilityName] = fr.short_effect;
    }
  });
});
</script>

<template>
  <div v-if="pokemon">
    <h2>{{ pokemon.name }}</h2>
    <img :src="pokemon.image" class="w-24 mx-auto" />

    <h3>Capacités :</h3>
    <ul>
      <li v-for="ability in abilities" :key="ability">
        {{ ability }} -  effet: {{ abilityEffectsFR[ability] }}
      </li>
    </ul>
      <h3>Espèce :</h3>
    <p>{{ species }}</p>
     <h3>Types :</h3>
    <ul>
      <li v-for="type in types" :key="type">
        {{ type }}
      </li>
    </ul>
    <h3>Dimensions :</h3>
    <p>Taille: {{ height }} m</p>
    <p>Poids: {{ weight }} kg</p>

  </div>
</template>
