import type { AppSettings } from '../types'

const STORAGE_KEY = 'projectflow_settings'

const defaultSettings: AppSettings = {
  appName: 'ProjectFlow',
  userName: '',
  defaultView: 'dashboard',
}

export function getSettings(): AppSettings {
  const savedSettings = localStorage.getItem(STORAGE_KEY)

  if (savedSettings) {
    return JSON.parse(savedSettings) as AppSettings
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(defaultSettings)
  )

  return defaultSettings
}

export function saveSettings(settings: AppSettings) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(settings)
  )
}