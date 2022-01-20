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

const tabs = [
  { name: 'All Photos', href: '#', current: true },
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
  const [selected, setSelected] = useState<File | null>(null)
  const { state } = useContext(SearchContext)
  const { query } = state

  useEffect(() => {
    setMyFiles([...manyFiles.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()))])
  }, [query])
  return (
    <Layout>
      <main className="flex-1 h-[calc(100vh-63px)] overflow-y-auto">
        <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex">
            <h1 className="flex-1 text-2xl font-bold text-gray-900">Photos</h1>
            <div className="ml-6 bg-gray-100 p-0.5 rounded-lg flex items-center sm:hidden">
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
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-3 sm:mt-2">
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
              <select
                id="tabs"
                name="tabs"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                defaultValue="Recently Viewed"
              >
                <option>Recently Viewed</option>
                <option>Recently Added</option>
                <option>Favorited</option>
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
                <div className="hidden ml-6 bg-gray-100 p-0.5 rounded-lg items-center sm:flex">
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
                </div>
              </div>
            </div>
          </div>

          {/* Gallery */}
          <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
            <h2 id="gallery-heading" className="sr-only">
              Recently viewed
            </h2>
            <ul
              role="list"
              className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
            >
              {myFiles.map((file) => (
                <li key={file.name} className="relative">
                  <div
                    onClick={() => {
                      if (file.id === selected?.id) {
                        setSelected(null)
                      } else {
                        setSelected(file)
                      }
                    }}
                    className={classNames(
                      file.id === selected?.id ? 'ring-2 ring-offset-2 ring-indigo-500' : 'focus:outline-none',
                      'group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden',
                    )}
                  >
                    <img
                      src={file.source}
                      alt=""
                      className={classNames(
                        file.id === selected?.id ? '' : 'group-hover:opacity-75',
                        'object-cover pointer-events-none focus:outline-none',
                      )}
                    />
                    <button type="button" className="absolute inset-0 focus:outline-none">
                      <span className="sr-only">View details for {file.name}</span>
                    </button>
                  </div>
                  <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                    {file.name}
                  </p>
                  <p className="block text-sm font-medium text-gray-500 pointer-events-none">{file.size}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      {/* Details sidebar */}

      <aside
        className={classNames(
          'hidden h-[calc(100vh-63px)] w-96 bg-white p-8 border-l border-gray-200 overflow-y-auto',
          selected ? ' lg:block' : '',
        )}
      >
        <div className="pb-16 space-y-6">
          <div>
            <div className="block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
              <img src={currentFile.source} alt="" className="object-cover" />
            </div>
            <div className="mt-4 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  <span className="sr-only">Details for </span>
                  {currentFile.name}
                </h2>
                <p className="text-sm font-medium text-gray-500">{currentFile.size}</p>
              </div>
              <button
                type="button"
                className="ml-4 bg-white rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <HeartIcon className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Favorite</span>
              </button>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Information</h3>
            <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
              {selected &&
                Object.keys(selected?.information).map((key) => (
                  <div key={key} className="py-3 flex justify-between text-sm font-medium">
                    <dt className="text-gray-500">{key}</dt>
                    <dd className="text-gray-900">{selected?.information[key]}</dd>
                  </div>
                ))}
            </dl>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Description</h3>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm text-gray-500 italic">Add a description to this image.</p>
              <button
                type="button"
                className="bg-white rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <PencilIcon className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Add description</span>
              </button>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Shared with</h3>
            <ul role="list" className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
              {currentFile.sharedWith.map((person) => (
                <li key={person.id} className="py-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <img src={person.imageUrl} alt="" className="w-8 h-8 rounded-full" />
                    <p className="ml-4 text-sm font-medium text-gray-900">{person.name}</p>
                  </div>
                  <button
                    type="button"
                    className="ml-6 bg-white rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Remove<span className="sr-only"> {person.name}</span>
                  </button>
                </li>
              ))}
              <li className="py-2 flex justify-between items-center">
                <button
                  type="button"
                  className="group -ml-1 bg-white p-1 rounded-md flex items-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <span className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                    <PlusSmIconSolid className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="ml-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-500">Share</span>
                </button>
              </li>
            </ul>
          </div>
          <div className="flex">
            <button
              type="button"
              className="flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Download
            </button>
            <button
              type="button"
              className="flex-1 ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Delete
            </button>
          </div>
        </div>
      </aside>
    </Layout>
  )
}

export default Index
