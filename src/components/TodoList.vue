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
  <div class="container mx-auto p-4 max-w-md">
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-purple-400">
      Todo App
    </h1>

    <!-- Add Todo Form -->
    <Form
      :validation-schema="formSchema"
      class="mb-6"
      @submit="addTodo"
    >
      <div class="flex gap-2">
        <FormField v-slot="{ componentField }" name="title">
          <FormItem class="flex-1">
            <FormControl>
              <Input
                v-model="newTodoTitle"
                v-bind="componentField"
                type="text"
                placeholder="Add new todo..."
                class="bg-secondary"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit" variant="secondary" class="bg-purple-600 hover:bg-purple-700">
          Add
        </Button>
      </div>
    </Form>

    <!-- Todo Lists -->
    <div class="space-y-4">
      <section>
        <h2 class="scroll-m-20 border-b border-purple-800/40 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-purple-400">
          Pending ({{ pendingTodos.length }})
        </h2>
        <ul class="space-y-2 mt-4">
          <li
            v-for="todo in pendingTodos"
            :key="todo.id"
            class="flex items-center gap-4 p-4 rounded-lg border border-purple-800/40 bg-secondary/50 text-foreground shadow-sm"
          >
            <Checkbox
              :checked="todo.completed"
              class="border-purple-600 data-[state=checked]:bg-purple-600"
              @update:checked="() => toggleTodo(todo)"
            />
            <span class="flex-1">{{ todo.title }}</span>
            <Button
              variant="ghost"
              size="sm"
              class="hover:bg-destructive/90 hover:text-destructive-foreground"
              @click="deleteTodo(todo.id!)"
            >
              Delete
            </Button>
          </li>
        </ul>
      </section>

      <section>
        <h2 class="scroll-m-20 border-b border-purple-800/40 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-purple-400">
          Completed ({{ completedTodos.length }})
        </h2>
        <ul class="space-y-2 mt-4">
          <li
            v-for="todo in completedTodos"
            :key="todo.id"
            class="flex items-center gap-4 p-4 rounded-lg border border-purple-800/40 bg-secondary/30 text-muted-foreground shadow-sm"
          >
            <Checkbox
              :checked="todo.completed"
              class="border-purple-600 data-[state=checked]:bg-purple-600"
              @update:checked="() => toggleTodo(todo)"
            />
            <span class="flex-1 line-through">{{ todo.title }}</span>
            <Button
              variant="ghost"
              size="sm"
              class="hover:bg-destructive/90 hover:text-destructive-foreground"
              @click="deleteTodo(todo.id!)"
            >
              Delete
            </Button>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
