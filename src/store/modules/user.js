import { userAccountLogin } from '@/api/user.js'
export default {
  namespaced: true,
  state: () => ({
    profile: {
      id: '',
      avatar: '',
      nickname: '',
      account: '',
      mobile: '',
      token: ''
    }
  }),
  mutations: {
    setProfile (state, payload) {
      state.profile = payload
    },
    delProfile (state) {
      state.profile = {}
    }
  },
  actions: {
    async get ({ commit }, payload) {
      const { result } = await userAccountLogin(payload)
      commit('setProfile', result)
    }
  }
}
