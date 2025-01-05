import Dexie, { type Table } from 'dexie'

export interface Todo {
  id?: number
  title: string
  completed: boolean
  createdAt: Date
}

export class TodoDB extends Dexie {
  todos!: Table<Todo>

  constructor() {
    super('TodoDB')
    this.version(1).stores({
      todos: '++id, title, completed, createdAt',
    })
  }
}

export const db = new TodoDB()
