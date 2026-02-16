<script setup>
import { ref } from 'vue'
import { useTeamStore } from '../stores/teamStore'

const store = useTeamStore()

const nickname = ref('')
const selectedPokemon = ref('')

const add = () => {
  store.addPokemon({
    name: selectedPokemon.value,
    nickname: nickname.value
  })

  nickname.value = ''
}
</script>

<template>
  <form @submit.prevent="add" class="flex gap-2">
    <input v-model="nickname" placeholder="Surnom" class="border p-2" />
    <input v-model="selectedPokemon" placeholder="Nom du pokemon" class="border p-2" />
    <button class="bg-green-500 text-white px-4">Ajouter</button>
  </form>
</template>
