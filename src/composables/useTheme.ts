import { usePreferredDark } from '@vueuse/core'
import { ref, watch } from 'vue'

export function useTheme() {
  const isDark = ref(usePreferredDark().value)

  watch(usePreferredDark(), (val) => {
    isDark.value = val
  })

  return {
    isDark,
  }
}
