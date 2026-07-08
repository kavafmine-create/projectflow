import { useState } from 'react'
import { DashboardLayout } from './components/layout/DashboardLayout'
import { Dashboard } from './pages/Dashboard'
import { Projects } from './pages/Projects'
import { Tasks } from './pages/Tasks'
import { Calendar } from './pages/Calendar'
import type { PageId } from './types'
import { Settings } from './pages/Settings'
import { getSettings } from './services/settingsStorage'

function App() {
  const [activePage, setActivePage] = useState<PageId>(() => {
    return getSettings().defaultView
  })

  function renderPage() {
    switch (activePage) {
      case 'projects':
        return <Projects />
      case 'tasks':
        return <Tasks />
        case 'calendar':
        return <Calendar />
        case 'settings':
       return <Settings />
      case 'dashboard':
      default:
        return <Dashboard />
    }
  }

  return (
    <DashboardLayout activePage={activePage} onNavigate={setActivePage}>
      {renderPage()}
    </DashboardLayout>
  )
}

export default App