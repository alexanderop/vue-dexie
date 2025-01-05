import { db, type Todo } from '@/db/todo'
import { useObservable } from '@vueuse/rxjs'
import { liveQuery } from 'dexie'
import { from } from 'rxjs'
import { computed, ref } from 'vue'

export function useTodos() {
  const newTodoTitle = ref('')
  const error = ref<string | null>(null)

  // Live query all todos
  const todos = useObservable<Todo[]>(
    from(liveQuery(() => db.todos.orderBy('createdAt').toArray())),
  )

  // Computed properties
  const completedTodos = computed(() =>
    todos.value?.filter(todo => todo.completed) ?? [],
  )

  const pendingTodos = computed(() =>
    todos.value?.filter(todo => !todo.completed) ?? [],
  )

  // Methods
  const addTodo = async () => {
    try {
      if (!newTodoTitle.value.trim())
        return

      await db.todos.add({
        title: newTodoTitle.value,
        completed: false,
        createdAt: new Date(),
      })

      newTodoTitle.value = ''
      error.value = null
    }
    catch (err) {
      error.value = 'Failed to add todo'
      console.error(err)
    }
  }

  const toggleTodo = async (todo: Todo) => {
    try {
      await db.todos.update(todo.id!, {
        completed: !todo.completed,
      })
      error.value = null
    }
    catch (err) {
      error.value = 'Failed to toggle todo'
      console.error(err)
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      await db.todos.delete(id)
      error.value = null
    }
    catch (err) {
      error.value = 'Failed to delete todo'
      console.error(err)
    }
  }

  return {
    todos,
    newTodoTitle,
    error,
    completedTodos,
    pendingTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
  }
}
