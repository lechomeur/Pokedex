<script setup>
import { useTeamStore } from '../stores/teamStore'
const store = useTeamStore()
</script>

<template>
  <div v-for="(poke, index) in store.team" :key="index">
    {{ poke.nickname }} ({{ poke.name }})
    <button @click="store.removePokemon(index)">❌</button>
  </div>
</template>
