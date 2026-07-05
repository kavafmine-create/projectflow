import { useEffect, useState, type FormEvent } from 'react'
import type { NewTaskFormData, Task, TaskPriority, TaskStatus } from '../types'
import { getTasks, saveTasks } from '../services/taskStorage'
import { getProjects } from '../services/projectStorage'

const emptyForm: NewTaskFormData = {
  projectId: '',
  title: '',
  description: '',
  priority: 'medium',
  assignee: '',
  dueDate: '',
}

export function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(() => getTasks())
  const [formData, setFormData] = useState<NewTaskFormData>(emptyForm)
  const [showForm, setShowForm] = useState(false)

  const projects = getProjects()

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!formData.projectId || !formData.title.trim() || !formData.assignee.trim() || !formData.dueDate) {
      return
    }

    const newTask: Task = {
      id: crypto.randomUUID(),
      projectId: formData.projectId,
      title: formData.title.trim(),
      description: formData.description.trim(),
      status: 'todo',
      priority: formData.priority,
      assignee: formData.assignee.trim(),
      dueDate: formData.dueDate,
      createdAt: new Date().toISOString(),
    }

    setTasks((currentTasks) => [newTask, ...currentTasks])
    setFormData(emptyForm)
    setShowForm(false)
  }

  function getProjectName(projectId: string) {
    return projects.find((project) => project.id === projectId)?.name ?? 'Proje bulunamadı'
  }

  function priorityLabel(priority: TaskPriority) {
    return {
      low: 'Düşük',
      medium: 'Orta',
      high: 'Yüksek',
      critical: 'Kritik',
    }[priority]
  }
  function statusLabel(status: TaskStatus) {
    return {
      todo: 'Yapılacak',
      in_progress: 'Devam Ediyor',
      review: 'Kontrol',
      completed: 'Tamamlandı',
    }[status]
  }
  
  function updateTaskStatus(taskId: string, status: TaskStatus) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, status } : task
      )
    )
  }
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Görevler</h1>
          <p className="mt-1 text-sm text-gray-500">Projelerinize ait görevleri yönetin.</p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
        >
          + Yeni Görev
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Toplam Görev</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{tasks.length}</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Yapılacak</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {tasks.filter((task) => task.status === 'todo').length}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Tamamlanan</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {tasks.filter((task) => task.status === 'completed').length}
          </p>
        </div>
      </div>

      {showForm && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Yeni Görev Oluştur</h2>

          <form onSubmit={handleSubmit} className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <select
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              value={formData.projectId}
              onChange={(event) => setFormData({ ...formData, projectId: event.target.value })}
            >
              <option value="">Proje seçin</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>

            <input
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              type="text"
              placeholder="Görev başlığı"
              value={formData.title}
              onChange={(event) => setFormData({ ...formData, title: event.target.value })}
            />

            <textarea
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm md:col-span-2"
              placeholder="Görev açıklaması"
              value={formData.description}
              onChange={(event) => setFormData({ ...formData, description: event.target.value })}
            />

            <select
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              value={formData.priority}
              onChange={(event) =>
                setFormData({ ...formData, priority: event.target.value as TaskPriority })
              }
            >
              <option value="low">Düşük</option>
              <option value="medium">Orta</option>
              <option value="high">Yüksek</option>
              <option value="critical">Kritik</option>
            </select>

            <input
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              type="text"
              placeholder="Atanan kişi"
              value={formData.assignee}
              onChange={(event) => setFormData({ ...formData, assignee: event.target.value })}
            />

            <input
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              type="date"
              value={formData.dueDate}
              onChange={(event) => setFormData({ ...formData, dueDate: event.target.value })}
            />

            <div className="flex gap-3 md:col-span-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700"
              >
                İptal
              </button>

              <button
                type="submit"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Görevi Kaydet
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Görev Listesi</h2>
        </div>

        {tasks.length === 0 ? (
          <p className="p-5 text-sm text-gray-500">Henüz görev bulunmuyor.</p>
        ) : (
          <div className="divide-y divide-gray-200">
            {tasks.map((task) => (
              <div key={task.id} className="p-5">
                <h3 className="font-semibold text-gray-900">{task.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{task.description}</p>
                <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-600">
                  <span>Proje: {getProjectName(task.projectId)}</span>
                  <span>Atanan: {task.assignee}</span>
                  <span>Öncelik: {priorityLabel(task.priority)}</span>
                  <span>Bitiş: {task.dueDate}</span>
                  <select
  className="rounded-lg border border-gray-300 px-2 py-1 text-sm"
  value={task.status}
  onChange={(event) => updateTaskStatus(task.id, event.target.value as TaskStatus)}
>
  <option value="todo">Yapılacak</option>
  <option value="in_progress">Devam Ediyor</option>
  <option value="review">Kontrol</option>
  <option value="completed">Tamamlandı</option>
</select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}