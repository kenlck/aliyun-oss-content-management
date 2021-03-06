import Modal from '@components/common/modal'
import FileUpload from '@components/files/upload'
import { SearchContext } from '@context/search'
import { SearchIcon, PlusSmIcon as PlusSmIconOutline } from '@heroicons/react/outline'
import { useContext, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { signOut } from 'next-auth/react'

const Header: React.FC = () => {
  const { state, dispatch } = useContext(SearchContext)
  const [query, setQuery] = useState('')
  const [modal, setModal] = useState(false)

  const [debouncedQuery] = useDebounce(query, 200)
  useEffect(() => {
    dispatch({ type: 'update_query', query: debouncedQuery })
  }, [debouncedQuery, dispatch])
  return (
    <div className="flex-1 flex justify-between px-4 sm:px-6">
      <div className="flex-1 flex">
        <form className="w-full flex md:ml-0" action="#" method="GET">
          <label htmlFor="desktop-search-field" className="sr-only">
            Search all files
          </label>
          <label htmlFor="mobile-search-field" className="sr-only">
            Search all files
          </label>
          <div className="relative w-full text-gray-400 focus-within:text-gray-600">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
              <SearchIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
            </div>
            <input
              name="mobile-search-field"
              id="mobile-search-field"
              className="h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:hidden"
              placeholder="Search"
              type="search"
              value={query}
              onChange={(e) => {
                e.preventDefault()
                setQuery(e.target.value)
              }}
            />
            <input
              name="desktop-search-field"
              id="desktop-search-field"
              className="hidden h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:block"
              placeholder="Search all files"
              type="search"
              value={query}
              onChange={(e) => {
                e.preventDefault()
                setQuery(e.target.value)
              }}
            />
          </div>
        </form>
      </div>
      <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
        {/* Profile dropdown */}
        {/* <Menu as="div" className="relative flex-shrink-0">
          <div>
            <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                alt=""
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              {userNavigation.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <a
                      href={item.href}
                      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                    >
                      {item.name}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu> */}

        <button
          type="button"
          onClick={() => setModal(true)}
          className="flex bg-indigo-600 p-1 rounded-full items-center justify-center text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusSmIconOutline className="h-6 w-6" aria-hidden="true" />
          <span className="sr-only">Add file</span>
        </button>
        <button
          type="button"
          onClick={() => signOut()}
          className="flex bg-indigo-600 p-1 rounded-full items-center justify-center text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="sr-only">Sign out</span>
        </button>
      </div>
      <Modal
        open={modal}
        onClose={() => {
          return setModal(false)
        }}
      >
        <FileUpload
          onClose={() => {
            return setModal(false)
          }}
        />
      </Modal>
    </div>
  )
}

export default Header
