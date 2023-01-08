import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SearchArtist from '../views/SearchArtist.vue'
import SearchSetlist from '../views/SearchSetlist.vue'
import Playlist from '../views/Playlist.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/search',
    component: SearchArtist
  },
  {
    path: '/search/:mbid',
    component: SearchSetlist
  },
  {
    path: '/playlist',
    component: Playlist
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
