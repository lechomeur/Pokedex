import { defineStore } from 'pinia'

interface Pokemon {
  name: string
  nickname?: string
  image?: string
}

export const useTeamStore = defineStore('team', {
  state: () => ({
    team: [] as Pokemon[]
  }),

  actions: {
    addPokemon(pokemon: Pokemon) {
      this.team.push(pokemon)
    },

    removePokemon(index: number) {
      this.team.splice(index, 1)
    }
  }
})
