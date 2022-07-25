import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'
import cart from './modules/cart'
import user from './modules/user'
import category from './modules/category'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    cart,
    user,
    category
  },
  plugins: [
    createPersistedstate({
      key: 'rabbit',
      path: ['user', 'cart']
    })
  ]
})
