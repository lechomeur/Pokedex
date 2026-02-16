import axios from "axios"

const API = "https://pokeapi.co/api/v2"

export const getPokemons = () =>
  axios.get(`${API}/pokemon?limit=20`)

export const getPokemonAbility = async (id) => {
  const { data } = await axios.get(`${API}/ability/${id}`)

  const effectFr = data.effect_entries.find(
    (e) => e.language.name === "fr"
  )

  const nameFr = data.names.find(
    (n) => n.language.name === "fr"
  )

  return {
    name: nameFr?.name,
    effect: effectFr?.effect,
    shortEffect: effectFr?.short_effect,
  }
}
