<template>
  <div class="goods-image">
    <!-- middle之前放置大图盒子 -->
    <div
      class="large"
      v-show="!isOutside"
      :style="[
        {
          backgroundImage: `url(${imageList[curIndex]})`,
          backgroundPositionX: `${bg.x}px`,
          backgroundPositionY: `${bg.y}px`,
        },
      ]"
    ></div>
    <div class="middle" ref="target">
      <img :src="imageList[curIndex]" alt="" />
      <!-- 蒙层滑块容器 -->
      <div
        class="layer"
        v-show="!isOutside"
        :style="{ left: left + 'px', top: top + 'px' }"
      ></div>
    </div>
    <ul class="small">
      <li
        v-for="(img, i) in imageList"
        :key="img"
        :class="{ active: curIndex === i }"
        @mouseenter="curIndex = i"
      >
        <img :src="img" alt="" />
      </li>
    </ul>
  </div>
</template>
<script>
import { ref, watch, reactive } from 'vue'
import { useMouseInElement } from '@vueuse/core'
export default {
  name: 'GoodsImage',
  props: {
    imageList: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    const target = ref(null)
    const curIndex = ref(0)
    // elementX 鼠标基于容器左上角X轴偏移
    // elementY 鼠标基于容器左上角Y轴偏移
    // isOutside 鼠标是否在模板容器外
    const { elementX, elementY, isOutside } = useMouseInElement(target)
    // 滑块位置数据
    const left = ref(0) // 滑块距离左侧的距离
    const top = ref(0) // 滑块距离顶部的距离
    // 大图放大比例数据
    const bg = reactive({ x: 0, y: 0 })
    watch([elementX, elementY, isOutside], () => {
      // console.log(elementX, elementY, isOutside)
      // 横向X
      if (elementX.value < 100) {
        // 左侧边界
        left.value = 0
      } else if (elementX.value > 300) {
        // 右侧边界
        left.value = 200
      } else {
        left.value = elementX.value - 100
      }
      // 纵向Y
      if (elementY.value < 100) {
        // 上侧边界
        top.value = 0
      } else if (elementY.value > 300) {
        // 下侧边界
        top.value = 200
      } else {
        top.value = elementY.value - 100
      }
      // 移动放大大图
      bg.x = -left.value * 2
      bg.y = -top.value * 2
    })
    return { curIndex, target, top, left, bg, isOutside }
  }
}
</script>

<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
