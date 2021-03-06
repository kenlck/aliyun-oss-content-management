import Layout from '@components/layout/layout'
import React, { useContext } from 'react'

import { classNames } from '@lib/classNames'
import { SearchContext } from '@context/search'
import FileList from '@components/files/list'
import ItemDetails from '@components/files/item_details'

const tabs = [
  { name: 'All Files', href: '#', current: true },
  // { name: 'Recently Added', href: '#', current: false },
  // { name: 'Favorited', href: '#', current: false },
]

const Index: React.FC = () => {
  const { state } = useContext(SearchContext)

  return (
    <Layout>
      <main className="flex-1 h-[calc(100vh-63px)] overflow-y-auto">
        <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex">
            <h1 className="flex-1 text-2xl font-bold text-gray-900">All Files</h1>
            {/* <div className="ml-6 bg-gray-100 p-0.5 rounded-lg flex items-center sm:hidden">
              <button
                type="button"
                className="p-1.5 rounded-md text-gray-400 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <ViewListIcon className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Use list view</span>
              </button>
              <button
                type="button"
                className="ml-0.5 bg-white p-1.5 rounded-md shadow-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <ViewGridIconSolid className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Use grid view</span>
              </button>
            </div> */}
          </div>

          {/* Tabs */}
          <div className="mt-3 sm:mt-2">
            <div className="hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              <select
                id="tabs"
                name="tabs"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                defaultValue="All Files"
              >
                <option>All Files</option>
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center border-b border-gray-200">
                <nav className="flex-1 -mb-px flex space-x-6 xl:space-x-8" aria-label="Tabs">
                  {tabs.map((tab) => (
                    <a
                      key={tab.name}
                      href={tab.href}
                      aria-current={tab.current ? 'page' : undefined}
                      className={classNames(
                        tab.current
                          ? 'border-indigo-500 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                        'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                      )}
                    >
                      {tab.name}
                    </a>
                  ))}
                </nav>
                {/* <div className="hidden ml-6 bg-gray-100 p-0.5 rounded-lg items-center sm:flex">
                  <button
                    type="button"
                    className="p-1.5 rounded-md text-gray-400 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  >
                    <ViewListIcon className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">Use list view</span>
                  </button>
                  <button
                    type="button"
                    className="ml-0.5 bg-white p-1.5 rounded-md shadow-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  >
                    <ViewGridIconSolid className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">Use grid view</span>
                  </button>
                </div> */}
              </div>
            </div>
          </div>

          {/* Gallery */}
          <FileList />
        </div>
      </main>

      {/* Details sidebar */}
      <ItemDetails />
    </Layout>
  )
}

export default Index
