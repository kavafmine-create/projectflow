import { getProjects } from '../services/projectStorage'
import { getTasks } from '../services/taskStorage'

const monthNames = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
]

const weekDays = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']

export function Calendar() {
  const projects = getProjects()
  const tasks = getTasks()

  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startOffset = (firstDay.getDay() + 6) % 7
  const totalCells = Math.ceil((startOffset + lastDay.getDate()) / 7) * 7

  const events = [
    ...projects.map((project) => ({
      id: `project-${project.id}`,
      title: project.name,
      date: project.endDate,
      type: 'Proje',
    })),
    ...tasks.map((task) => ({
      id: `task-${task.id}`,
      title: task.title,
      date: task.dueDate,
      type: 'Görev',
    })),
  ]

  const days = Array.from({ length: totalCells }, (_, index) => {
    const dayNumber = index - startOffset + 1
    const isCurrentMonth = dayNumber >= 1 && dayNumber <= lastDay.getDate()
    const date = isCurrentMonth
      ? `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`
      : ''

    return {
      dayNumber,
      isCurrentMonth,
      date,
      events: events.filter((event) => event.date === date),
    }
  })

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Takvim</h1>
        <p className="mt-1 text-sm text-gray-500">
          Proje ve görev tarihlerini aylık görünümde takip edin.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {monthNames[month]} {year}
          </h2>
        </div>

        <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
          {weekDays.map((day) => (
            <div key={day} className="px-3 py-2 text-center text-xs font-semibold text-gray-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {days.map((day, index) => (
            <div
              key={index}
              className="min-h-28 border-b border-r border-gray-200 p-2"
            >
              {day.isCurrentMonth && (
                <>
                  <div className="text-sm font-semibold text-gray-700">
                    {day.dayNumber}
                  </div>

                  <div className="mt-2 space-y-1">
                    {day.events.map((event) => (
                      <div
                        key={event.id}
                        className="truncate rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700"
                      >
                        {event.type}: {event.title}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}