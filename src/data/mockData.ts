import type { DashboardStats, Project } from '../types'

export const dashboardStats: DashboardStats = {
  totalProjects: 12,
  activeTasks: 34,
  overdueTasks: 5,
  completedWork: 128,
}

export const recentProjects: Project[] = [
  {
    id: '1',
    name: 'E-Ticaret Platformu',
    status: 'active',
    progress: 72,
    dueDate: '2026-07-15',
    team: 'Frontend Ekibi',
  },
  {
    id: '2',
    name: 'Mobil Uygulama v2',
    status: 'active',
    progress: 45,
    dueDate: '2026-08-01',
    team: 'Mobil Ekibi',
  },
  {
    id: '3',
    name: 'CRM Entegrasyonu',
    status: 'planning',
    progress: 15,
    dueDate: '2026-09-10',
    team: 'Backend Ekibi',
  },
  {
    id: '4',
    name: 'Dashboard Yenileme',
    status: 'completed',
    progress: 100,
    dueDate: '2026-06-20',
    team: 'UI/UX Ekibi',
  },
  {
    id: '5',
    name: 'API Gateway',
    status: 'on_hold',
    progress: 30,
    dueDate: '2026-07-30',
    team: 'DevOps Ekibi',
  },
]
