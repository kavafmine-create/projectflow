import type { ReactNode } from 'react'

export type ProjectStatus = 'active' | 'completed' | 'on_hold' | 'planning'

export type ProjectPriority = 'low' | 'medium' | 'high' | 'critical'

export type PageId = 'dashboard' | 'projects' | 'tasks' | 'calendar' | 'settings'

export interface DashboardStats {
  totalProjects: number
  activeTasks: number
  overdueTasks: number
  completedWork: number
}

export interface Project {
  id: string
  name: string
  description: string
  status: ProjectStatus
  priority: ProjectPriority
  progress: number
  startDate: string
  endDate: string
  team: string
}

export interface NewProjectFormData {
  name: string
  description: string
  priority: ProjectPriority
  endDate: string
  team: string
}

export interface NavItem {
  id: PageId
  label: string
  href: string
  icon: ReactNode
  active?: boolean
}
