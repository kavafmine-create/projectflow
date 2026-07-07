import { StatCard } from '../components/dashboard/StatCard'
import { RecentProjectsTable } from '../components/dashboard/RecentProjectsTable'
import {
  BriefcaseIcon,
  ClipboardIcon,
  AlertIcon,
  CheckCircleIcon,
} from '../components/icons'
import { getTasks } from '../services/taskStorage'
import { getProjects } from '../services/projectStorage'


export function Dashboard() {
  const recentProjects = getProjects().slice(0, 5)
  const tasks = getTasks()

const today = new Date().toISOString().split('T')[0]

const totalProjects = recentProjects.length

const activeTasks = tasks.filter(
  (task) => task.status !== 'completed'
).length

const overdueTasks = tasks.filter(
  (task) =>
    task.status !== 'completed' &&
    task.dueDate < today
).length

const completedWork = tasks.filter(
  (task) => task.status === 'completed'
).length
 

const stats = {
  totalProjects: recentProjects.length,
  activeTasks: tasks.filter((task) => task.status !== 'completed').length,
  overdueTasks: tasks.filter(
    (task) => task.status !== 'completed' && task.dueDate < today
  ).length,
  completedWork: tasks.filter((task) => task.status === 'completed').length,
}
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
          value={stats.totalProjects}
          icon={<BriefcaseIcon className="h-6 w-6" />}
          iconBg="bg-indigo-50"
          iconColor="text-indigo-600"
        />
        <StatCard
          title="Aktif Görev"
          value={stats.activeTasks}
          icon={<ClipboardIcon className="h-6 w-6" />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Geciken Görev"
          value={stats.overdueTasks}
          icon={<AlertIcon className="h-6 w-6" />}
          iconBg="bg-red-50"
          iconColor="text-red-600"
        />
        <StatCard
          title="Tamamlanan İş"
          value={stats.completedWork}
          icon={<CheckCircleIcon className="h-6 w-6" />}
          iconBg="bg-green-50"
          iconColor="text-green-600"
        />
      </div>

      <RecentProjectsTable projects={recentProjects} />
    </div>
  )
}
