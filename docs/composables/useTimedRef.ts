import { watch } from "vue"

export default function useTimedRef(timeout: number): Ref<boolean> {
  const bool = ref(false)
  watch(bool, () => {
    setTimeout(() => {
      bool.value = false
    }, timeout)
  })
  return bool
}
