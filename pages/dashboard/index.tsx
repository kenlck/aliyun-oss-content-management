import Layout from '@components/layout/layout'
import React, { useContext, useEffect, useState } from 'react'
import { HeartIcon } from '@heroicons/react/outline'
import {
  PencilIcon,
  PlusSmIcon as PlusSmIconSolid,
  ViewGridIcon as ViewGridIconSolid,
  ViewListIcon,
} from '@heroicons/react/solid'
import { classNames } from '@lib/classNames'
import { SearchContext } from '@context/search'
import FileList from '@components/files/list'
import ItemDetails from '@components/files/item_details'

const tabs = [
  { name: 'All Files', href: '#', current: true },
  // { name: 'Recently Added', href: '#', current: false },
  // { name: 'Favorited', href: '#', current: false },
]

type File = {
  id: number
  name: string
  size: string
  source: string
  information: {
    'Uploaded by': string
    Created: string
    'Last modified': string
    Dimensions: string
    Resolution: string
  }
  sharedWith: {
    id: number
    name: string
    imageUrl: string
  }[]
}
const files: File[] = [
  {
    id: 1,
    name: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source:
      'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    information: {
      'Uploaded by': 'Marie Culver',
      Created: 'June 8, 2020',
      'Last modified': 'June 8, 2020',
      Dimensions: '4032 x 3024',
      Resolution: '72 x 72',
    },
    sharedWith: [
      {
        id: 1,
        name: 'Aimee Douglas',
        imageUrl:
          'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80',
      },
      {
        id: 2,
        name: 'Andrea McMillan',
        imageUrl:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    ],
  },
  // More files...
]
const manyFiles = Array(100).fill(files[0])
const currentFile = {
  name: 'IMG_4985.HEIC',
  size: '3.9 MB',
  source:
    'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  information: {
    'Uploaded by': 'Marie Culver',
    Created: 'June 8, 2020',
    'Last modified': 'June 8, 2020',
    Dimensions: '4032 x 3024',
    Resolution: '72 x 72',
  },
  sharedWith: [
    {
      id: 1,
      name: 'Aimee Douglas',
      imageUrl:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80',
    },
    {
      id: 2,
      name: 'Andrea McMillan',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
}

const Index: React.FC = () => {
  const [myFiles, setMyFiles] = useState(manyFiles)
  // const [selected, setSelected] = useState<File | null>(null)
  const { state } = useContext(SearchContext)
  const { query } = state
  const selected = state.selectedId
  useEffect(() => {
    setMyFiles([...manyFiles.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()))])
  }, [query])

  return (
    <Layout>
      <main className="flex-1 h-[calc(100vh-63px)] overflow-y-auto">
        <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex">
            <h1 className="flex-1 text-2xl font-bold text-gray-900">Photos</h1>
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
