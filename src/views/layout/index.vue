<template>
  <!-- 顶部通栏 -->
  <top-nav></top-nav>
  <top-header></top-header>
  <!-- 吸顶组件 -->
  <HeaderSticky />
  <main>
    <!-- 二级路由出口 -->
    <router-view></router-view>
  </main>
  <foot></foot>
</template>

<script>
import topNav from './components/topnav.vue'
import topHeader from './components/header.vue'
import foot from './components/footer.vue'
import HeaderSticky from './components/header-sticky'
import { useStore } from 'vuex'
export default {
  name: 'xtx-layout',
  components: {
    topNav,
    topHeader,
    foot,
    HeaderSticky
  },
  setup () {
    const store = useStore()
    store.dispatch('category/asyncSetList')
  }
}
</script>

<style scoped lang="less"></style>
