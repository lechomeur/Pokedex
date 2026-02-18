import { defineStore } from 'pinia'

interface TeamPokemon {
  id: number
  name: string
  nickname: string
  role:[string]
}

export const useTeamStore = defineStore("team", {
  state: () => ({
    team: [] as TeamPokemon[],
  }),

  actions: {
    addPokemon(pokemon: TeamPokemon) {
      if (this.team.length < 6) {
        this.team.push(pokemon)
      }
    },

    removePokemon(index: number) {
      this.team.splice(index, 1)
    },

    updatePokemon(index: number, data: Partial<TeamPokemon>) {
      this.team[index] = { ...this.team[index], ...data } as TeamPokemon
    }
  },
})

