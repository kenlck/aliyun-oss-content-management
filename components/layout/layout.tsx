import { Fragment, useState } from 'react'
import {
  HomeIcon,
  MenuAlt2Icon,
  // CogIcon,
  // CollectionIcon,
  // PhotographIcon,
  // UserGroupIcon,
  // ViewGridIcon as ViewGridIconOutline,
} from '@heroicons/react/outline'
import Sidebar from './sidebar'
import MobileMenu from './mobile_menu'
import Header from './header'

export const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: true },
  // { name: 'All Files', href: '#', icon: ViewGridIconOutline, current: false },
  // { name: 'Photos', href: '#', icon: PhotographIcon, current: true },
  // { name: 'Shared', href: '#', icon: UserGroupIcon, current: false },
  // { name: 'Albums', href: '#', icon: CollectionIcon, current: false },
  // { name: 'Settings', href: '#', icon: CogIcon, current: false },
]
export const userNavigation = [
  // { name: 'Your profile', href: '#' },
  // { name: 'Sign out', href: '#' },
]

const Layout: React.FC = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full overflow-hidden">
        ```
      */}
      <div className="h-full flex min-h-screen">
        {/* Narrow sidebar */}
        <Sidebar />

        {/* Mobile menu */}
        <MobileMenu mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

        {/* Content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="w-full">
            <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
              <button
                type="button"
                className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              <Header />
            </div>
          </header>

          {/* Main content */}
          <div className="flex-1 flex items-stretch overflow-hidden">{children}</div>
        </div>
      </div>
    </>
  )
}

export default Layout
