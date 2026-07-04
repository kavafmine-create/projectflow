import type { Project, ProjectStatus } from '../../types'

type RecentProjectsTableProps = {
  projects: Project[]
}

const statusLabels: Record<ProjectStatus, string> = {
  active: 'Aktif',
  completed: 'Tamamlandı',
  on_hold: 'Beklemede',
  planning: 'Planlama',
}

const statusStyles: Record<ProjectStatus, string> = {
  active: 'bg-green-50 text-green-700 ring-green-600/20',
  completed: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  on_hold: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  planning: 'bg-gray-50 text-gray-600 ring-gray-500/20',
}

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateStr))
}

export function RecentProjectsTable({ projects }: RecentProjectsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-5 py-4">
        <h2 className="text-base font-semibold text-gray-900">Son Projeler</h2>
        <p className="mt-0.5 text-sm text-gray-500">En son güncellenen projeleriniz</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Proje Adı
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Durum
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                İlerleme
              </th>
              <th className="hidden px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:table-cell">
                Son Tarih
              </th>
              <th className="hidden px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:table-cell">
                Ekip
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-gray-900">
                  {project.name}
                </td>
                <td className="whitespace-nowrap px-5 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${statusStyles[project.status]}`}
                  >
                    {statusLabels[project.status]}
                  </span>
                </td>
                <td className="whitespace-nowrap px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-indigo-600 transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">{project.progress}%</span>
                  </div>
                </td>
                <td className="hidden whitespace-nowrap px-5 py-4 text-sm text-gray-500 sm:table-cell">
                  {formatDate(project.endDate)}
                </td>
                <td className="hidden whitespace-nowrap px-5 py-4 text-sm text-gray-500 md:table-cell">
                  {project.team}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
