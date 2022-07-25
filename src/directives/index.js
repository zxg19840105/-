import { useIntersectionObserver } from '@vueuse/core'
import img from '@/assets/images/load.gif'
export default {
  install (app) {
    app.directive('test', {
      mounted (el, binding) {
        el.style.border = '1px solid red'
        console.log(binding.value)
      }
    })
    app.directive('lazy', {
      mounted (el, binding) {
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }], observerElement) => {
            if (isIntersecting) {
              el.src = img
              setTimeout(() => {
                el.src = binding.value
              }, 300)
              stop()
            }
          },
          { threshold: 0 }
        )
      }
    })
  }
}
