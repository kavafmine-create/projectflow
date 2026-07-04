import { useState, type ReactNode } from 'react'
import type { PageId } from '../../types'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

type DashboardLayoutProps = {
  children: ReactNode
  activePage: PageId
  onNavigate: (page: PageId) => void
}

export function DashboardLayout({ children, activePage, onNavigate }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        activePage={activePage}
        onNavigate={onNavigate}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
