import { initialProjects } from '../data/mockData'
import type { Project } from '../types'

const STORAGE_KEY = 'projectflow_projects'

export function getProjects(): Project[] {
  const saved = localStorage.getItem(STORAGE_KEY)

  if (saved) {
    return JSON.parse(saved) as Project[]
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProjects))
  return initialProjects
}

export function saveProjects(projects: Project[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}