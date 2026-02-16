import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PokemonDetailView from '../views/PokemonDetailView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/poketeam',
      name: 'poketeam',
      component: () => import('../views/PokeTeam.vue'),
    },
    { path: '/pokemon/:name', component: PokemonDetailView },

  ],
})

export default router
