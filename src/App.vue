<script setup lang="ts">
import TheWelcome from '@/components/TheWelcome.vue'
import { useTheme } from '@/composables/useTheme'

const { isDark } = useTheme()
</script>

<template>
  <div :class="[isDark ? 'dark' : '']">
    <main class="min-h-screen bg-background text-foreground">
      <TheWelcome />
    </main>
  </div>
</template>
