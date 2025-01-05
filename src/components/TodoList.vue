<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useTodos } from '@/composables/useTodos'
import { Icon } from '@iconify/vue'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

const formSchema = toTypedSchema(z.object({
  title: z.string().min(1, 'Todo title is required').max(50, 'Todo title is too long'),
}))

const {
  newTodoTitle,
  completedTodos,
  pendingTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
} = useTodos()
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="sticky top-0 z-10 backdrop-blur-lg bg-background/75 border-b border-border/40">
      <div class="px-4 py-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <Icon
            icon="lucide:list-todo"
            class="w-6 h-6 text-purple-400"
          />
          <h1 class="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            My Tasks
          </h1>
        </div>
      </div>
    </header>

    <!-- Add Todo Form -->
    <div class="px-4 py-3 border-b border-border/40">
      <Form
        :validation-schema="formSchema"
        @submit="addTodo"
      >
        <div class="flex gap-2">
          <FormField v-slot="{ componentField }" name="title">
            <FormItem class="flex-1">
              <FormControl>
                <div class="relative">
                  <Icon
                    icon="lucide:plus-circle"
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground/50"
                  />
                  <Input
                    v-model="newTodoTitle"
                    v-bind="componentField"
                    type="text"
                    placeholder="Add a new task..."
                    class="bg-secondary/50 border-0 rounded-full pl-10 placeholder:text-muted-foreground/50"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <Button
            type="submit"
            variant="secondary"
            class="rounded-full px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-opacity"
          >
            <Icon icon="lucide:plus" class="w-5 h-5 mr-1" />
            Add
          </Button>
        </div>
      </Form>
    </div>

    <!-- Todo Lists -->
    <div class="flex-1 px-4 divide-y divide-border/40">
      <!-- Pending Todos -->
      <section class="py-4">
        <h2 class="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
          <Icon icon="lucide:circle-dot" class="w-4 h-4" />
          Tasks ({{ pendingTodos.length }})
        </h2>
        <ul class="space-y-3">
          <li
            v-for="todo in pendingTodos"
            :key="todo.id"
            class="group flex items-center gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            <Checkbox
              :checked="todo.completed"
              class="border-2"
              @update:checked="() => toggleTodo(todo)"
            />
            <span class="flex-1">{{ todo.title }}</span>
            <Button
              variant="ghost"
              size="icon"
              class="text-muted-foreground/50 hover:text-destructive transition-colors"
              @click="() => deleteTodo(todo.id!)"
            >
              <Icon icon="lucide:trash-2" class="w-4 h-4" />
            </Button>
          </li>
        </ul>
      </section>

      <!-- Completed Todos -->
      <section class="py-4">
        <h2 class="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
          <Icon icon="lucide:check-circle" class="w-4 h-4" />
          Completed ({{ completedTodos.length }})
        </h2>
        <ul class="space-y-3">
          <li
            v-for="todo in completedTodos"
            :key="todo.id"
            class="group flex items-center gap-3 p-3 rounded-xl bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            <Checkbox
              :checked="todo.completed"
              class="border-2"
              @update:checked="() => toggleTodo(todo)"
            />
            <span class="flex-1 line-through text-muted-foreground">{{ todo.title }}</span>
            <Button
              variant="ghost"
              size="icon"
              class="text-muted-foreground/50 hover:text-destructive transition-colors"
              @click="() => deleteTodo(todo.id!)"
            >
              <Icon icon="lucide:trash-2" class="w-4 h-4" />
            </Button>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
