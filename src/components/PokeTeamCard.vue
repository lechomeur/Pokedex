<script setup lang="ts">
import { ref } from "vue"
import { useTeamStore } from "@/stores/pokeTeam"

const props = defineProps<{
  pokemon: any
  index: number
}>()

const teamStore = useTeamStore()

const editMode = ref(false)
const nickname = ref(props.pokemon.nickname)
const role = ref(props.pokemon.role || "Attaquant")

const roles = ["Attaquant", "Défenseur", "Support"]

function save() {
  teamStore.updatePokemon(props.index, {
    nickname: nickname.value,
    role: role.value,
  })

  editMode.value = false
}
</script>

<template>
  <div class="card">

    <img :src="pokemon.image" />

    <template v-if="editMode">

      <input v-model="nickname" placeholder="Surnom" />

      <select v-model="role">
        <option v-for="r in roles" :key="r">{{ r }}</option>
      </select>

      <button @click="save">💾</button>

    </template>

    <template v-else>

      <h3>{{ pokemon.nickname || pokemon.name }}</h3>
      <p>{{ pokemon.role || "Aucun rôle" }}</p>

      <button @click="editMode = true">⚙️</button>
      <button @click="teamStore.removePokemon(index)">❌</button>

    </template>

  </div>
</template>
