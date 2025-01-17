import Dexie, { type Table } from 'dexie'
import dexieCloud from 'dexie-cloud-addon'

export interface Todo {
  id?: string
  title: string
  completed: boolean
  createdAt: Date
}

export class TodoDB extends Dexie {
  todos!: Table<Todo>

  constructor() {
    super('TodoDB', { addons: [dexieCloud] })
    this.version(1).stores({
      todos: '@id, title, completed, createdAt',
    })
  }

  async configureSync(databaseUrl: string) {
    await this.cloud.configure({
      databaseUrl,
      requireAuth: true,
      tryUseServiceWorker: true,
    })
  }
}

export const db = new TodoDB()

if (!import.meta.env.VITE_DEXIE_CLOUD_URL) {
  throw new Error('VITE_DEXIE_CLOUD_URL environment variable is not defined')
}

db.configureSync(import.meta.env.VITE_DEXIE_CLOUD_URL).catch((err) => {
  console.error('Failed to configure cloud sync:', err)
  if (err.name === 'NetworkError') {
    console.error('Network error - please check your connection')
  }
})

export const currentUser = db.cloud.currentUser
export const login = () => db.cloud.login()
export const logout = () => db.cloud.logout()
