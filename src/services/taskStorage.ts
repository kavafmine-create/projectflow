import type { Task } from '../types'

const STORAGE_KEY = 'projectflow_tasks'

const initialTasks: Task[] = []

export function getTasks(): Task[] {
  const saved = localStorage.getItem(STORAGE_KEY)

  if (saved) {
    return JSON.parse(saved) as Task[]
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTasks))
  return initialTasks
}

export function saveTasks(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}