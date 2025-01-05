<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { currentUser, login, logout } from '@/db/todo'
import { Icon } from '@iconify/vue'
import { useObservable } from '@vueuse/rxjs'
import { computed, ref } from 'vue'

const user = useObservable(currentUser)
const isAuthenticated = computed(() => !!user.value)
const isLoading = ref(false)

async function handleLogin() {
  isLoading.value = true
  try {
    await login()
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div v-if="!isAuthenticated" class="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
    <Card class="max-w-md w-full">
      <CardHeader class="space-y-1">
        <CardTitle class="text-2xl text-center">
          Welcome Back
        </CardTitle>
        <CardDescription class="text-center">
          Sign in to access your todos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Button
              class="w-full"
              size="lg"
              :disabled="isLoading"
              @click="handleLogin"
            >
              <template v-if="isLoading">
                <div class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground" />
                Signing in...
              </template>
              <template v-else>
                Continue with Email
              </template>
            </Button>
          </div>
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t" />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-card px-2 text-muted-foreground">
                Secure Authentication
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p class="text-xs text-center text-muted-foreground w-full">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </CardFooter>
    </Card>
  </div>
  <template v-else>
    <div class="sticky top-0 z-20 bg-card border-b">
      <div class="flex items-center justify-between px-4 py-3">
        <span class="text-sm text-card-foreground flex items-center gap-2">
          <Icon icon="lucide:user" class="w-4 h-4" />
          {{ user?.email }}
        </span>
        <Button
          variant="ghost"
          size="sm"
          class="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          @click="logout"
        >
          <Icon icon="lucide:log-out" class="w-4 h-4" />
          Sign out
        </Button>
      </div>
    </div>
    <slot />
  </template>
</template>
