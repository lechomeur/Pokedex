<script setup>
defineProps(['pokemon'])
</script>

<template>
  <div class="border p-4 rounded">
    <img :src="pokemon.image" class="w-24 mx-auto" />
    <h2 class="text-center capitalize">{{ pokemon.name }}</h2>

    <router-link :to="`/pokemon/${pokemon.name}`">
      Détails
    </router-link>
  </div>
</template>
