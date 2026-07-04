import { useEffect, useState, type FormEvent } from 'react'
import type { NewProjectFormData, Project, ProjectPriority, ProjectStatus } from '../types'
import { getProjects, saveProjects } from '../services/projectStorage'
import { PlusIcon, XIcon } from '../components/icons'

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

const priorityLabels: Record<ProjectPriority, string> = {
  low: 'Düşük',
  medium: 'Orta',
  high: 'Yüksek',
  critical: 'Kritik',
}

const priorityStyles: Record<ProjectPriority, string> = {
  low: 'bg-gray-50 text-gray-600 ring-gray-500/20',
  medium: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  high: 'bg-orange-50 text-orange-700 ring-orange-600/20',
  critical: 'bg-red-50 text-red-700 ring-red-600/20',
}

const emptyForm: NewProjectFormData = {
  name: '',
  description: '',
  priority: 'medium',
  endDate: '',
  team: '',
}

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateStr))
}

function generateId(): string {
  return crypto.randomUUID()
}

type FormErrors = Partial<Record<keyof NewProjectFormData, string>>

function validateForm(data: NewProjectFormData): FormErrors {
  const errors: FormErrors = {}

  if (!data.name.trim()) {
    errors.name = 'Proje adı zorunludur'
  }
  if (!data.description.trim()) {
    errors.description = 'Açıklama zorunludur'
  }
  if (!data.endDate) {
    errors.endDate = 'Bitiş tarihi zorunludur'
  }
  if (!data.team.trim()) {
    errors.team = 'Ekip zorunludur'
  }

  return errors
}

type NewProjectModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: NewProjectFormData) => void
}

function NewProjectModal({ isOpen, onClose, onSubmit }: NewProjectModalProps) {
  const [form, setForm] = useState<NewProjectFormData>(emptyForm)
  const [errors, setErrors] = useState<FormErrors>({})

  if (!isOpen) return null

  function handleClose() {
    setForm(emptyForm)
    setErrors({})
    onClose()
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const validationErrors = validateForm(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    onSubmit(form)
    setForm(emptyForm)
    setErrors({})
  }

  function updateField<K extends keyof NewProjectFormData>(key: K, value: NewProjectFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    }
  }

  const inputClass = (field: keyof NewProjectFormData) =>
    `w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
      errors[field]
        ? 'border-red-300 focus:border-red-300 focus:ring-red-100'
        : 'border-gray-200 focus:border-indigo-300 focus:ring-indigo-100'
    }`

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <div
        className="fixed inset-0 bg-gray-900/50"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Yeni Proje</h2>
            <p className="mt-0.5 text-sm text-gray-500">Proje bilgilerini doldurun</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
            aria-label="Kapat"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          <div>
            <label htmlFor="project-name" className="mb-1.5 block text-sm font-medium text-gray-700">
              Proje Adı
            </label>
            <input
              id="project-name"
              type="text"
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="Proje adını girin"
              className={inputClass('name')}
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="project-description" className="mb-1.5 block text-sm font-medium text-gray-700">
              Açıklama
            </label>
            <textarea
              id="project-description"
              rows={3}
              value={form.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Proje açıklamasını girin"
              className={inputClass('description')}
            />
            {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
          </div>

          <div>
            <label htmlFor="project-priority" className="mb-1.5 block text-sm font-medium text-gray-700">
              Öncelik
            </label>
            <select
              id="project-priority"
              value={form.priority}
              onChange={(e) => updateField('priority', e.target.value as ProjectPriority)}
              className={inputClass('priority')}
            >
              <option value="low">Düşük</option>
              <option value="medium">Orta</option>
              <option value="high">Yüksek</option>
              <option value="critical">Kritik</option>
            </select>
          </div>

          <div>
            <label htmlFor="project-end-date" className="mb-1.5 block text-sm font-medium text-gray-700">
              Bitiş Tarihi
            </label>
            <input
              id="project-end-date"
              type="date"
              value={form.endDate}
              onChange={(e) => updateField('endDate', e.target.value)}
              className={inputClass('endDate')}
            />
            {errors.endDate && <p className="mt-1 text-xs text-red-600">{errors.endDate}</p>}
          </div>

          <div>
            <label htmlFor="project-team" className="mb-1.5 block text-sm font-medium text-gray-700">
              Ekip
            </label>
            <input
              id="project-team"
              type="text"
              value={form.team}
              onChange={(e) => updateField('team', e.target.value)}
              placeholder="Ekip adını girin"
              className={inputClass('team')}
            />
            {errors.team && <p className="mt-1 text-xs text-red-600">{errors.team}</p>}
          </div>

          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              İptal
            </button>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Projeyi Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>(() => getProjects())

useEffect(() => {
  saveProjects(projects)
}, [projects])

  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleAddProject(data: NewProjectFormData) {
    const today = new Date().toISOString().split('T')[0]

    const newProject: Project = {
      id: generateId(),
      name: data.name.trim(),
      description: data.description.trim(),
      status: 'planning',
      priority: data.priority,
      progress: 0,
      startDate: today,
      endDate: data.endDate,
      team: data.team.trim(),
    }

    setProjects((prev) => [newProject, ...prev])
    setIsModalOpen(false)
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projeler</h1>
          <p className="mt-1 text-sm text-gray-500">Tüm projelerinizi yönetin</p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <PlusIcon className="h-4 w-4" />
          Yeni Proje
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
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
                <th className="hidden px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:table-cell">
                  Öncelik
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  İlerleme
                </th>
                <th className="hidden px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:table-cell">
                  Başlangıç
                </th>
                <th className="hidden px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 lg:table-cell">
                  Bitiş
                </th>
                <th className="hidden px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 xl:table-cell">
                  Ekip
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-5 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{project.name}</p>
                      <p className="mt-0.5 max-w-xs truncate text-xs text-gray-500 sm:hidden">
                        {project.team}
                      </p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${statusStyles[project.status]}`}
                    >
                      {statusLabels[project.status]}
                    </span>
                  </td>
                  <td className="hidden whitespace-nowrap px-5 py-4 sm:table-cell">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${priorityStyles[project.priority]}`}
                    >
                      {priorityLabels[project.priority]}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-20 overflow-hidden rounded-full bg-gray-100 sm:w-24">
                        <div
                          className="h-full rounded-full bg-indigo-600 transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="hidden whitespace-nowrap px-5 py-4 text-sm text-gray-500 md:table-cell">
                    {formatDate(project.startDate)}
                  </td>
                  <td className="hidden whitespace-nowrap px-5 py-4 text-sm text-gray-500 lg:table-cell">
                    {formatDate(project.endDate)}
                  </td>
                  <td className="hidden whitespace-nowrap px-5 py-4 text-sm text-gray-500 xl:table-cell">
                    {project.team}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {projects.length === 0 && (
          <div className="px-5 py-12 text-center">
            <p className="text-sm font-medium text-gray-900">Henüz proje yok</p>
            <p className="mt-1 text-sm text-gray-500">İlk projenizi oluşturmak için &quot;Yeni Proje&quot; butonuna tıklayın.</p>
          </div>
        )}
      </div>

      <NewProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddProject}
      />
    </div>
  )
}
