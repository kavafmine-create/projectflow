import { StatCard } from '../components/dashboard/StatCard'
import { RecentProjectsTable } from '../components/dashboard/RecentProjectsTable'
import {
  BriefcaseIcon,
  ClipboardIcon,
  AlertIcon,
  CheckCircleIcon,
} from '../components/icons'
import { dashboardStats, recentProjects } from '../data/mockData'

export function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Projelerinize genel bir bakış atın
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Toplam Proje"
          value={dashboardStats.totalProjects}
          icon={<BriefcaseIcon className="h-6 w-6" />}
          iconBg="bg-indigo-50"
          iconColor="text-indigo-600"
        />
        <StatCard
          title="Aktif Görev"
          value={dashboardStats.activeTasks}
          icon={<ClipboardIcon className="h-6 w-6" />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Geciken Görev"
          value={dashboardStats.overdueTasks}
          icon={<AlertIcon className="h-6 w-6" />}
          iconBg="bg-red-50"
          iconColor="text-red-600"
        />
        <StatCard
          title="Tamamlanan İş"
          value={dashboardStats.completedWork}
          icon={<CheckCircleIcon className="h-6 w-6" />}
          iconBg="bg-green-50"
          iconColor="text-green-600"
        />
      </div>

      <RecentProjectsTable projects={recentProjects} />
    </div>
  )
}
