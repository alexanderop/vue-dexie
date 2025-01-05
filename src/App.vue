<script setup lang="ts">
import AuthGuard from '@/components/AuthGuard.vue'
</script>

<template>
  <AuthGuard>
    <div class="min-h-screen bg-background text-foreground">
      <div class="safe-area-top bg-background" />
      <RouterView />
      <div class="safe-area-bottom bg-background" />
    </div>
  </AuthGuard>
</template>

<style>
.safe-area-top {
  padding-top: env(safe-area-inset-top, 0px);
}
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
</style>
