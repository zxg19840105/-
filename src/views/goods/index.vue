<template>
  <div class="xtx-goods-page" v-if="goods.categories">
    <div class="container">
      <!-- 面包屑 -->
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>
          {{ goods.categories[1].name }}
        </XtxBreadItem>
        <XtxBreadItem>
          {{ goods.categories[0].name }}
        </XtxBreadItem>
        <XtxBreadItem to="/">
          {{ goods.name }}
        </XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <!-- 商品信息 -->
      <div class="goods-info">
        <!-- 新增结构 -->
        <!-- 图片预览区 -->
        <div class="media">
          <GoodsImage :imageList="goods.mainPictures" />
          <!-- 销量组件 -->
          <GoodsSales />
        </div>
        <!-- 商品信息区 -->
        <div class="spec">
          <!-- 信息组件 -->
          <GoodsName />
          <!-- 新增 sku -->
          <GoodsSku :goods="goods" @change="getSku" />
          <!-- 商品数量 -->
          <XtxNumbox :max="goods.inventory" v-model="buyNum"></XtxNumbox>
          <button @click="add">加入购物车</button>
        </div>
      </div>
      <div class="goods-footer">
        <div class="goods-article">
          <div class="goods-tabs">
            <!-- 详情图片列表 -->
            <img
              v-for="(item, index) in goods.details.pictures"
              :Key="index"
              :src="item"
            />
          </div>
        </div>
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { provide, ref } from 'vue'
import { findGoods } from '@/api/goods'
import { useRoute } from 'vue-router'
import GoodsImage from './components/goods-image.vue'
import GoodsSales from './components/goods-sales'
import GoodsName from './components/goods-name'
import { useStore } from 'vuex'
export default {
  name: 'XtxGoodsPage',
  components: { GoodsImage, GoodsSales, GoodsName },
  setup () {
    const goods = ref({})
    const skuGood = ref({})
    const store = useStore()
    provide('goods', goods)
    const route = useRoute()
    const getList = async () => {
      const { result } = await findGoods(route.params.id)
      goods.value = result
    }
    getList()
    // 获取sku数据
    const getSku = (sku) => {
      console.log('sku:', sku)
      // 修改商品的现价原价库存信息
      if (sku.skuId) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
      }
      skuGood.value = sku
    }
    const buyNum = ref(1)
    const add = async () => {
      if (!skuGood.value.specsText) {
        return alert('请选择商品规格')
      }
      if (skuGood.value.inventory === 0) {
        return alert('商品没有库存')
      }
      const addDetail = {
        id: goods.value.id,
        name: goods.value.name,
        picture: goods.value.mainPictures[0],
        skuId: skuGood.value.skuId,
        price: skuGood.value.oldPrice,
        nowPrice: skuGood.value.price,
        attrsText: skuGood.value.specsText,
        stock: skuGood.value.inventory,
        selected: true,
        isEffective: true,
        count: buyNum.value
      }
      try {
        const msg = await store.dispatch('cart/addLogin', addDetail)
        console.log(msg)
      } catch (error) {

      }
    }
    return {
      goods, getSku, buyNum, add
    }
  }
}
</script>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  // 新增样式
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
    background: #fff;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
  img {
    width: 100%;
  }
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
