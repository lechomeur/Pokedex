import axios from "axios"

const API = "https://pokeapi.co/api/v2"

export const getPokemons = () =>
  axios.get(`${API}/pokemon?limit=50`)

export const getPokemonDetails = async (name) => {  
  const response = await axios.get(`${API}/pokemon/${name.toLowerCase()}`)
  console.log(response)
  if (response.status === 200) {
    return response.data
  }else {
    throw new Error(`recuperer des donnée echoué pour :  ${name}`)
  }
}
