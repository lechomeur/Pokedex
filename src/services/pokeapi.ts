import axios from "axios";

const API = "https://pokeapi.co/api/v2";

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
}

export interface PokemonDetails {
  id: number;
  name: string;
  types: PokemonType[];
  abilities: PokemonAbility[];
  species: {
    name: string;
  };
  sprites: {
    front_default: string;
  };
  height : number;
weight : number;
}

export interface AbilityEffect {

  effect: string;
  short_effect: string;
  language: {
     name: string;
  };
}
export interface AbilityDetails {
  effect_entries: AbilityEffect[];
}


export const getPokemons = () => {
  return axios.get<{ results: PokemonListItem[] }>(`${API}/pokemon?limit=50`);
};

export const getPokemonDetails = async (name: string): Promise<PokemonDetails> => {
  const response = await axios.get<PokemonDetails>(`${API}/pokemon/${name.toLowerCase()}`);
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(`Récupération des données échouée pour : ${name}`);
  }
};

export const getAbilityEffect = async (name: string): Promise<AbilityDetails> => {
  const response = await axios.get<AbilityDetails>(
    `${API}/ability/${name.toLowerCase()}`
  );
  return response.data;
};

