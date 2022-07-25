<template>
  <HomePanel ref="target" title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
    <template #right>
      <xtx-more></xtx-more>
    </template>
    <template #default>
      <ul ref="pannel" class="goods-list">
        <li v-for="item in list" :key="item.id">
          <RouterLink :to="`goods/${item.id}`">
            <img v-lazy="item.picture" alt="" />
            <p class="name">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
    </template>
  </HomePanel>
</template>

<script>
import HomePanel from './home-panel'
import { findNew } from '@/api/home'
import { ref } from 'vue'
import { useObserve } from '@/hooks'
// import { useIntersectionObserver } from '@vueuse/core'
export default {
  components: {
    HomePanel
  },
  setup () {
    // 1.定义响应式数据
    const list = ref([])
    // const target = ref(null)
    const getList = async () => {
      const { result } = await findNew()
      list.value = result
    }

    // const { stop } = useIntersectionObserver(
    //   target,
    //   ([{ isIntersecting }], observerElement) => {
    //     if (isIntersecting) {
    //       getList()
    //       stop()
    //     }
    //   }
    // )
    const { target } = useObserve(getList)
    return {
      list,
      target
    }
  }
}
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    // 激活效果
    transition: all 0.5s;
    &:hover {
      transform: translate3d(0, -6px, 0);
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
    }
    // end
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
