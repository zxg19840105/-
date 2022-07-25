import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
export function useObserve (fn) {
  const target = ref(null)
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        fn()
        stop()
      }
    },
    { threshold: 0 }
  )
  return { target }
}
