import { useState, type FormEvent } from 'react'
import type { AppSettings } from '../types'
import {
  getSettings,
  saveSettings,
} from '../services/settingsStorage'

export function Settings() {
  const [settings, setSettings] = useState<AppSettings>(() =>
    getSettings()
  )

  const [saved, setSaved] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    saveSettings(settings)
    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 2000)
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Ayarlar
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Uygulama tercihlerinizi yönetin.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Uygulama Adı
            </label>

            <input
              type="text"
              value={settings.appName}
              onChange={(event) =>
                setSettings({
                  ...settings,
                  appName: event.target.value,
                })
              }
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="ProjectFlow"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Kullanıcı Adı
            </label>

            <input
              type="text"
              value={settings.userName}
              onChange={(event) =>
                setSettings({
                  ...settings,
                  userName: event.target.value,
                })
              }
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="Adınızı girin"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Varsayılan Açılış Sayfası
            </label>

            <select
              value={settings.defaultView}
              onChange={(event) =>
                setSettings({
                  ...settings,
                  defaultView: event.target
                    .value as AppSettings['defaultView'],
                })
              }
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="dashboard">Dashboard</option>
              <option value="projects">Projeler</option>
              <option value="tasks">Görevler</option>
              <option value="calendar">Takvim</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Ayarları Kaydet
            </button>

            {saved && (
              <span className="text-sm font-medium text-green-600">
                Ayarlar kaydedildi.
              </span>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}