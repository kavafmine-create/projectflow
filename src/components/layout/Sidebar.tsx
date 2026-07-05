import type { NavItem, PageId } from '../../types'
import {
  LayoutDashboardIcon,
  FolderIcon,
  CheckSquareIcon,
  CalendarIcon,
  SettingsIcon,
  XIcon,
} from '../icons'

const navItems: Omit<NavItem, 'active'>[] = [
  { id: 'dashboard', label: 'Dashboard', href: '#', icon: <LayoutDashboardIcon className="h-5 w-5" /> },
  { id: 'projects', label: 'Projeler', href: '#', icon: <FolderIcon className="h-5 w-5" /> },
  { id: 'tasks', label: 'Görevler', href: '#', icon: <CheckSquareIcon className="h-5 w-5" /> },
  { id: 'calendar', label: 'Takvim', href: '#', icon: <CalendarIcon className="h-5 w-5" /> },
  { id: 'settings', label: 'Ayarlar', href: '#', icon: <SettingsIcon className="h-5 w-5" /> },
]

type SidebarProps = {
  isOpen: boolean
  activePage: PageId
  onNavigate: (page: PageId) => void
  onClose: () => void
}

export function Sidebar({ isOpen, activePage, onNavigate, onClose }: SidebarProps) {
  function handleNavClick(page: PageId) {
    onNavigate(page)
    onClose()
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white
          transition-transform duration-200 ease-in-out
          lg:static lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <span className="text-sm font-bold text-white">PF</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">ProjectFlow</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 lg:hidden"
            aria-label="Menüyü kapat"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive = activePage === item.id
            const isNavigable = item.id === 'dashboard' || item.id === 'projects' || item.id === 'tasks' ||
  item.id === 'calendar'

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => isNavigable && handleNavClick(item.id as PageId)}
                disabled={!isNavigable}
                className={`
                  flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors
                  ${isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : isNavigable
                      ? 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      : 'cursor-not-allowed text-gray-400'}
                `}
              >
                <span className={isActive ? 'text-indigo-600' : isNavigable ? 'text-gray-400' : 'text-gray-300'}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="border-t border-gray-200 p-4">
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-xs font-medium text-gray-500">Plan</p>
            <p className="mt-0.5 text-sm font-semibold text-gray-900">Pro</p>
            <p className="mt-1 text-xs text-gray-500">12 proje limiti</p>
          </div>
        </div>
      </aside>
    </>
  )
}
