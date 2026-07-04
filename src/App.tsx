import { useState } from 'react'
import { DashboardLayout } from './components/layout/DashboardLayout'
import { Dashboard } from './pages/Dashboard'
import { Projects } from './pages/Projects'
import type { PageId } from './types'

function App() {
  const [activePage, setActivePage] = useState<PageId>('dashboard')

  function renderPage() {
    switch (activePage) {
      case 'projects':
        return <Projects />
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
