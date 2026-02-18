<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { getPokemonDetails, getAbilityEffect } from "../services/pokeapi";
import { typeGradients } from "@/utils/colors";

const route = useRoute();

const pokemon = ref<any>(null);
const abilityEffectsFR = ref<Record<string, string>>({});

onMounted(async () => {
  const name = route.params.name as string;
  const res = await getPokemonDetails(name);
  
  // Verificação de segurança
  if (res && res.abilities) {
    pokemon.value = res;

    const abilityPromises = res.abilities.map((a: any) => getAbilityEffect(a.ability.name));
    const effects = await Promise.all(abilityPromises);

    effects.forEach((data, index) => {
      // verication tradution fr
      const fr = data?.effect_entries?.find((e: any) => e.language.name === "fr");
      
      if (fr && res.abilities[index]) {
        const abilityName = res.abilities[index].ability.name;
        abilityEffectsFR.value[abilityName] = fr.short_effect;
      }
    });
  }
});

// couleur de fond dynamique basée sur le type du Pokémon
const mainColor = computed(() => {
  if (!pokemon.value) return 'rgba(168, 167, 122, 0.85)';
  const type = pokemon.value.types[0].type.name.toLowerCase();
  return typeGradients[type] || 'rgba(168, 167, 122, 0.85)';
});
</script>

<template>
  <div v-if="pokemon" class="details-wrapper">
    <div class="glass-card" :style="{ background: mainColor }">
      
      <div class="visual-side">
        <div class="image-container">
          <img 
            :src="pokemon.sprites.other.home.front_default" 
            :alt="pokemon.name" 
            class="pokemon-img"
          />
        </div>
        <div class="pkmn-header">
          <span class="pkmn-id">#{{ pokemon.id.toString().padStart(3, '0') }}</span>
          <h1>{{ pokemon.name }}</h1>
          <div class="types-list">
            <span v-for="t in pokemon.types" :key="t.type.name" class="type-badge">
              {{ t.type.name }}
            </span>
          </div>
        </div>
      </div>

      <div class="info-side">
        <div class="stats-row">
          <div class="stat-box">
            <small>Espèce</small>
            <strong>{{ pokemon.species.name }}</strong>
          </div>
          <div class="stat-box">
            <small>Taille</small>
            <strong>{{ pokemon.height / 10 }} m</strong>
          </div>
          <div class="stat-box">
            <small>Poids</small>
            <strong>{{ pokemon.weight / 10 }} kg</strong>
          </div>
        </div>

        <div class="abilities-container">
          <h3>Capacités</h3>
          <div v-for="a in pokemon.abilities" :key="a.ability.name" class="ability-card">
            <span class="ability-title">{{ a.ability.name }}</span>
            <p class="ability-desc">
              {{ abilityEffectsFR[a.ability.name] || 'Traduction en cours...' }}
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.details-wrapper {
  padding: 60px 20px;
  display: flex;
  justify-content: center;
  min-height: 80vh;
}

.glass-card {
  display: flex;
  width: 100%;
  max-width: 950px;
  border-radius: 40px;
  overflow: hidden;
  background: v-bind(mainColor); 
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 50px rgba(0,0,0,0.1);
}

/* Left side */
.visual-side {
  flex: 1;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
}

.pokemon-img {
  width: 100%;
  max-width: 280px;
  filter: drop-shadow(0 12px 20px rgba(0,0,0,0.2));
}

.pkmn-header { text-align: center; margin-top: 20px; }
.pkmn-id { font-weight: 800; opacity: 0.5; font-size: 1.2rem; }
h1 { font-size: 3rem; text-transform: capitalize; font-weight: 900; margin: 5px 0; }

.types-list { display: flex; gap: 10px; justify-content: center; margin-top: 15px; }
.type-badge {
  background: rgba(255,255,255,0.2);
  padding: 6px 15px;
  border-radius: 12px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.8rem;
}

/* Rigth side */
.info-side {
  flex: 1.2;
  padding: 50px;
  background: rgba(255, 255, 255, 0.85);
}

:global(body.dark-theme) .info-side {
  background: rgba(30, 30, 30, 0.85);
  color: white;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.stat-box { display: flex; flex-direction: column; }
.stat-box small { text-transform: uppercase; font-size: 0.7rem; opacity: 0.6; font-weight: 700; }
.stat-box strong { font-size: 1.1rem; }

.abilities-container h3 { margin-bottom: 20px; font-size: 1.4rem; }
.ability-card {
  background: rgba(var(--type-rgb), 0.1);
  padding: 15px;
  border-radius: 20px;
  margin-bottom: 12px;
  border: 1px solid rgba(var(--type-rgb), 0.1);
}

.ability-title { font-weight: 800; text-transform: capitalize; color: #FB5584; display: block; margin-bottom: 5px; }
.ability-desc { font-size: 0.9rem; line-height: 1.4; opacity: 0.9; }

@media (max-width: 850px) {
  .glass-card { flex-direction: column; }
  .visual-side { padding: 30px; }
}
</style>
