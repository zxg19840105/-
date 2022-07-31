export default {
  namespaced: true,
  state: () => ({
    list: []
  }),
  getters: {
    // 计算有效商品列表 isEffective = true  filter
    effectiveList (state) {
      return state.list.filter((item) => item.isEffective === true)
    },
    // 已选中列表 selected = true
    selectedList (state, getters) {
      return getters.effectiveList.filter((item) => item.selected)
    },
    // 已选择列表总钱数  selectedList 中所有项的单价*数据进行叠加
    allSelectedPrice (state, getters) {
      return getters.selectedList.reduce((a, c) => a + c.count * c.nowPrice, 0)
    },
    // 全选：有效列表中的seleted字段全为true 才为true
    isAll (state, getters) {
      return getters.effectiveList.every((item) => item.selected)
    }
  },
  mutations: {
    addCart (state, payload) {
      const index = state.list.findIndex(
        (item) => item.skuId === payload.skuId
      )
      if (index > -1) {
        state.list[index].count += payload.count
      } else {
        state.list.unshift(payload)
      }
    },
    singleCheck (state, { good, selected }) {
      const curItem = state.list.find((item) => item.skuId === good.skuId)
      curItem.selected = selected
    },
    // mutaion
    allCheck (state, selected) {
      state.list.forEach((item) => {
        item.selected = selected
      })
    },
    // 数量修改mutation
    changeCount (state, { good, count }) {
      const item = state.list.find(item => item.skuId === good.skuId)
      item.count = count
    }
  },
  actions: {
    async addLogin ({ commit, rootState }, payload) {
      if (rootState.user.profile.token) {
        alert('已登录')
      } else {
        commit('addCart', payload)
        return '加入成功'
      }
    },
    async singleCheck ({ commit, rootState }, { good, selected }) {
      if (rootState.user.profile.token) {
        alert('已登录')
      } else {
        commit('singleCheck', { good, selected })
        return '加入成功'
      }
    },
    async allCheck ({ commit, rootState }, selected) {
      if (rootState.user.profile.token) {
        alert('已登录')
      } else {
        commit('allCheck', selected)
        return '加入成功'
      }
    },
    async changeCount ({ commit, rootState }, { good, count }) {
      if (rootState.user.profile.token) {
        alert('已登录')
      } else {
        commit('changeCount', { good, count })
        return '加入成功'
      }
    }
  }
}
