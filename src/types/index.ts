import type { ReactNode } from 'react'

export type ProjectStatus = 'active' | 'completed' | 'on_hold' | 'planning'

export interface DashboardStats {
  totalProjects: number
  activeTasks: number
  overdueTasks: number
  completedWork: number
}

export interface Project {
  id: string
  name: string
  status: ProjectStatus
  progress: number
  dueDate: string
  team: string
}

export interface NavItem {
  id: string
  label: string
  href: string
  icon: ReactNode
  active?: boolean
}
