import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'
import cart from './modules/cart'
import user from './modules/user'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    cart, user
  },
  plugins: [createPersistedstate({
    key: 'rabbit',
    path: ['user', 'cart']
  })]
})
