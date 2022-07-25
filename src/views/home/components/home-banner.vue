<template>
  <div class="home-banner">
    <XtxSlider :data="list" autoPlay></XtxSlider>
  </div>
</template>

<script>
import { findBanner } from '@/api/home.js'
import { ref } from 'vue'
export default {
  name: 'HomeBanner',
  setup () {
    const list = ref([])
    const getList = async () => {
      const { result } = await findBanner()
      list.value = result
    }
    getList()
    return {
      list
    }
  }
}
</script>

<style scoped lang='less'>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
</style>
