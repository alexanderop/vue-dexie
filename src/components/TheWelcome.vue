<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Icon } from '@iconify/vue'
import FeatureCard from './FeatureCard.vue'

interface Feature {
  title: string
  description: string
  icon: string
  color: string
}

const mainFeatures: Feature[] = [
  {
    title: 'Vue 3.5 & TypeScript',
    description: 'Build scalable applications with Vue 3.5\'s Composition API and TypeScript 5.6\'s strong type checking.',
    icon: 'mdi:language-typescript',
    color: 'text-blue-600',
  },
  {
    title: 'Vite Powered',
    description: 'Lightning fast development with Vite 5, offering instant server start and hot module replacement.',
    icon: 'simple-icons:vite',
    color: 'text-purple-600',
  },
  {
    title: 'State Management',
    description: 'Intuitive state management with Pinia, featuring dev-tools support and TypeScript integration.',
    icon: 'mdi:database',
    color: 'text-yellow-600',
  },
  {
    title: 'UI Components',
    description: 'Beautiful, accessible components from Shadcn-Vue with full TypeScript support and customization.',
    icon: 'mdi:palette-swatch',
    color: 'text-green-600',
  },
]

const toolingFeatures: Feature[] = [
  {
    title: 'TailwindCSS & Shadcn',
    description: 'Utility-first CSS with TailwindCSS and beautifully designed, accessible components from Shadcn.',
    icon: 'simple-icons:tailwindcss',
    color: 'text-cyan-500',
  },
  {
    title: 'Testing Suite',
    description: 'Comprehensive testing with Vitest for unit tests and Playwright for end-to-end testing.',
    icon: 'mdi:test-tube',
    color: 'text-red-500',
  },
  {
    title: 'Code Quality',
    description: 'ESLint with @antfu/eslint-config for consistent, high-quality code standards.',
    icon: 'mdi:code-tags-check',
    color: 'text-indigo-500',
  },
  {
    title: 'Developer Experience',
    description: 'Enhanced DX with Vue DevTools integration and TypeScript support.',
    icon: 'mdi:tools',
    color: 'text-gray-600',
  },
]

const stats = [
  { label: 'Development Server', value: '5173', icon: 'mdi:port' },
  { label: 'Node Version', value: '20.x+', icon: 'logos:nodejs-icon' },
  { label: 'TypeScript', value: '5.6', icon: 'logos:typescript-icon' },
  { label: 'Vue Version', value: '3.5', icon: 'logos:vue' },
]
</script>

<template>
  <div class="min-h-screen bg-background py-12">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center">
        <h1 class="text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
          Vue.js Starter Template
        </h1>
        <p class="mt-3 max-w-2xl mx-auto text-xl text-muted-foreground sm:mt-4">
          A modern foundation for building scalable Vue.js applications with TypeScript, Pinia, and more.
        </p>

        <!-- Quick Stats -->
        <div class="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4">
          <Card
            v-for="stat in stats"
            :key="stat.label"
            class="px-4 py-5"
          >
            <CardHeader>
              <div class="flex items-center justify-center space-x-2">
                <Icon :icon="stat.icon" class="h-6 w-6" />
                <CardTitle class="text-sm font-medium text-muted-foreground">
                  {{ stat.label }}
                </CardTitle>
              </div>
              <CardDescription class="mt-1 text-lg font-semibold text-foreground text-center">
                {{ stat.value }}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      <!-- Core Features -->
      <div class="mt-16">
        <h2 class="text-2xl font-bold text-foreground mb-8">
          Core Features
        </h2>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            v-for="feature in mainFeatures"
            :key="feature.title"
            v-bind="feature"
          />
        </div>
      </div>

      <!-- Developer Tools -->
      <div class="mt-16">
        <h2 class="text-2xl font-bold text-foreground mb-8">
          Developer Tools
        </h2>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            v-for="feature in toolingFeatures"
            :key="feature.title"
            v-bind="feature"
          />
        </div>
      </div>

      <!-- Getting Started -->
      <div class="mt-16 text-center">
        <div class="inline-flex flex-col items-center space-y-4">
          <Button
            variant="default"
            size="lg"
            as-child
            class="space-x-2"
          >
            <a
              href="https://github.com/your-username/your-repo-name"
              target="_blank"
              rel="noopener"
            >
              <Icon icon="mdi:github" class="h-5 w-5" />
              <span>Use Template</span>
            </a>
          </Button>
          <p class="text-sm text-muted-foreground">
            Or run
            <code class="px-2 py-1 bg-muted rounded text-sm font-mono">
              npm install
            </code>
            to get started
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
