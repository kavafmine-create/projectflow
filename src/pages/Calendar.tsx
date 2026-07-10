import { useState } from 'react'
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
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const today = new Date()

  const [currentDate, setCurrentDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  )
  
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  function goToPreviousMonth() {
    setCurrentDate(
      (current) =>
        new Date(
          current.getFullYear(),
          current.getMonth() - 1,
          1
        )
    )
  }
  
  function goToNextMonth() {
    setCurrentDate(
      (current) =>
        new Date(
          current.getFullYear(),
          current.getMonth() + 1,
          1
        )
    )
  }
  
  function goToToday() {
    setCurrentDate(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      )
    )
  }

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
  const selectedEvents = selectedDate
  ? events.filter((event) => event.date === selectedDate)
  : []
  const days = Array.from({ length: totalCells }, (_, index) => {
    const dayNumber = index - startOffset + 1
    const isCurrentMonth = dayNumber >= 1 && dayNumber <= lastDay.getDate()
    const date = isCurrentMonth
      ? `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`
      : ''

      const todayString = `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    return {
      dayNumber,
      isCurrentMonth,
      date,
      isToday: date === todayString,
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
      <div className="flex flex-col gap-3 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
  <h2 className="text-lg font-semibold text-gray-900">
    {monthNames[month]} {year}
  </h2>

  <div className="flex items-center gap-2">
    <button
      type="button"
      onClick={goToPreviousMonth}
      className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      Önceki
    </button>

    <button
      type="button"
      onClick={goToToday}
      className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      Bugün
    </button>

    <button
      type="button"
      onClick={goToNextMonth}
      className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      Sonraki
    </button>
  </div>
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
      onClick={() => {
        if (day.isCurrentMonth) {
          setSelectedDate(day.date)
        }
      }}
      className={`min-h-28 border-b border-r border-gray-200 p-2 ${
        day.isCurrentMonth
          ? 'cursor-pointer hover:bg-gray-50'
          : ''
      } ${
        selectedDate === day.date
          ? 'ring-2 ring-inset ring-indigo-500'
          : ''
      }`}
    >
      {day.isCurrentMonth && (
        <>
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold ${
              day.isToday
                ? 'bg-red-600 text-white'
                : 'text-gray-700'
            }`}
          >
            {day.dayNumber}
          </div>

          <div className="mt-2 space-y-1">
            {day.events.map((event) => (
              <div
                key={event.id}
                className={`truncate rounded-md px-2 py-1 text-xs font-medium ${
                  event.type === 'Proje'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'bg-green-50 text-green-700'
                }`}
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

{selectedDate && (
  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between gap-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Gün Detayı
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {new Date(`${selectedDate}T00:00:00`).toLocaleDateString(
            'tr-TR',
            {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }
          )}
        </p>
      </div>

      <button
        type="button"
        onClick={() => setSelectedDate(null)}
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
      >
        Kapat
      </button>
    </div>

    <div className="mt-4 space-y-2">
      {selectedEvents.length === 0 ? (
        <p className="text-sm text-gray-500">
          Bu tarihte proje veya görev bulunmuyor.
        </p>
      ) : (
        selectedEvents.map((event) => (
          <div
            key={event.id}
            className={`rounded-lg border p-3 ${
              event.type === 'Proje'
                ? 'border-indigo-200 bg-indigo-50'
                : 'border-green-200 bg-green-50'
            }`}
          >
            <p className="text-sm font-semibold text-gray-900">
              {event.title}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {event.type}
            </p>
          </div>
        ))
      )}
    </div>
  </div>
)}
</div>
)
}