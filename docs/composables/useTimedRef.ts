import { watch } from "vue"

export default function useTimedRef(timeout: number): Ref<boolean> {
  const bool = ref(true)
  watch(ref, () => {
    setTimeout(() => {
      bool.value = false
    }, timeout)
  })
  return bool
}
