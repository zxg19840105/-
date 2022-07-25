import skeleton from './Skeleton/index.vue'
import slider from './Slider/index.vue'
import more from './More/index.vue'
import bread from './Bread/index.vue'
import breadItem from './Bread/item.vue'
import city from './City/index.vue'
const arr = [skeleton, slider, more, bread, breadItem, city]
export default {
  install (app) {
    arr.forEach(item => {
      app.component(item.name, item)
    })
  }
}
