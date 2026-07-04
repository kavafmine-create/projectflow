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
    description: 'Modern e-ticaret altyapısının geliştirilmesi',
    status: 'active',
    priority: 'high',
    progress: 72,
    startDate: '2026-01-15',
    endDate: '2026-07-15',
    team: 'Frontend Ekibi',
  },
  {
    id: '2',
    name: 'Mobil Uygulama v2',
    description: 'iOS ve Android için yeni sürüm geliştirme',
    status: 'active',
    priority: 'medium',
    progress: 45,
    startDate: '2026-02-01',
    endDate: '2026-08-01',
    team: 'Mobil Ekibi',
  },
  {
    id: '3',
    name: 'CRM Entegrasyonu',
    description: 'Müşteri ilişkileri yönetim sistemi entegrasyonu',
    status: 'planning',
    priority: 'medium',
    progress: 15,
    startDate: '2026-03-10',
    endDate: '2026-09-10',
    team: 'Backend Ekibi',
  },
  {
    id: '4',
    name: 'Dashboard Yenileme',
    description: 'Yönetim paneli arayüzünün yeniden tasarımı',
    status: 'completed',
    priority: 'low',
    progress: 100,
    startDate: '2026-01-01',
    endDate: '2026-06-20',
    team: 'UI/UX Ekibi',
  },
  {
    id: '5',
    name: 'API Gateway',
    description: 'Mikroservisler için merkezi API geçidi',
    status: 'on_hold',
    priority: 'critical',
    progress: 30,
    startDate: '2026-02-15',
    endDate: '2026-07-30',
    team: 'DevOps Ekibi',
  },
]

export const initialProjects: Project[] = [...recentProjects]
