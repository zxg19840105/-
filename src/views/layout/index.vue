<template>
  <!-- 顶部通栏 -->
  <top-nav></top-nav>
  <top-header>头部</top-header>
  <main>
    <!-- 二级路由出口 -->
    <router-view></router-view>
  </main>
  <footer>底部</footer>
</template>

<script>
import topNav from './components/topnav.vue'
import topHeader from './components/header.vue'
export default {
  name: 'xtx-layout',
  components: {
    topNav,
    topHeader
  }
}
</script>

<style scoped lang="less"></style>
