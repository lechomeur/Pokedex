<script setup lang="ts">
import { useTeamStore } from "@/stores/pokeTeam"
import PokeTeamCard from "@/components/PokeTeamCard.vue"

const teamStore = useTeamStore()
</script>

<template>
  <h1>Ma Team</h1>

  <div class="team-grid">
    <PokeTeamCard
      v-for="(poke, index) in teamStore.team"
      :key="index"
      :pokemon="poke"
      :index="index"
    />
  </div>
</template>


<style scoped>
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 30px;
}
</style>
