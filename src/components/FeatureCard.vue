<script setup lang="ts">
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Icon } from '@iconify/vue'

interface Props {
  title: string
  description: string
  icon: string
  color: string
}

defineProps<Props>()
</script>

<template>
  <Card class="hover:shadow-md transition-all duration-300">
    <CardHeader>
      <div class="flex items-center space-x-3">
        <Icon
          :icon="icon"
          class="h-6 w-6"
          :class="[color]"
          width="24"
          height="24"
        />
        <CardTitle class="text-lg">
          {{ title }}
        </CardTitle>
      </div>
      <CardDescription>
        {{ description }}
      </CardDescription>
    </CardHeader>
  </Card>
</template>
