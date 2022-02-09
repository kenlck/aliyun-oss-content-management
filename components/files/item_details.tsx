import { HeartIcon, PencilIcon, PlusSmIcon as PlusSmIconSolid } from '@heroicons/react/solid'
import { useContext, useState } from 'react'
import { SearchContext } from '@context/search'
import useSWR from 'swr'
import fetcher from '@lib/fetcher'
import { Asset, User } from '@prisma/client'
import numeral from 'numeral'
import Slideover from '@components/common/slideover'
import { useSession } from 'next-auth/react'

type FetchProps = Asset & {
  User: User
}
const ItemDetails: React.FC = () => {
  const { state, dispatch } = useContext(SearchContext)
  const { data: session } = useSession()
  const [isLoading, setLoading] = useState(false)
  const { data: selected, error } = useSWR<FetchProps>([`/api/assets/`, state.selectedId], (api, id) =>
    fetcher(`${api}${id}`),
  )

  return (
    <Slideover open={!!selected} onClose={() => dispatch({ type: 'update_selected', selected: '' })}>
      <div className="pb-16 space-y-6">
        <div>
          <div className="block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
            {selected?.type?.includes('image') ? (
              <img src={selected.url} alt="" className="object-cover" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 m-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            )}
          </div>
          <div className="mt-4 flex items-start justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                <span className="sr-only">Details for </span>
                {selected?.filename}
              </h2>
              <p className="text-sm font-medium text-gray-500">{numeral(selected?.size).format('0.00 b')}</p>
            </div>
            {/* <button
              type="button"
              className="ml-4 bg-white rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <HeartIcon className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">Favorite</span>
            </button> */}
          </div>
        </div>
        <div>
          <h3 className="font-medium text-gray-900">Information</h3>
          <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
            <div className="py-3 flex justify-between text-sm font-medium">
              <dt className="text-gray-500">ID</dt>
              <dd className="text-gray-900">{selected?.assetId}</dd>
            </div>
            <div className="py-3 flex justify-between text-sm font-medium">
              <dt className="text-gray-500">Name</dt>
              <dd className="text-gray-900">{selected?.filename}</dd>
            </div>
            <div className="py-3 flex justify-between text-sm font-medium">
              <dt className="text-gray-500">Type</dt>
              <dd className="text-gray-900">{selected?.type}</dd>
            </div>
            <div className="py-3 flex justify-between text-sm font-medium">
              <dt className="text-gray-500">Created at</dt>
              <dd className="text-gray-900">{selected?.createdAt}</dd>
            </div>
            <div className="py-3 flex justify-between text-sm font-medium">
              <dt className="text-gray-500">Size</dt>
              <dd className="text-gray-900">{numeral(selected?.size).format('0.00 b')}</dd>
            </div>
            <div className="py-3 flex flex-col justify-between text-sm font-medium">
              <dt className="text-gray-500">URL</dt>
              <dd className="text-gray-900">{selected?.url}</dd>
            </div>
            <div className="py-3 flex justify-between text-sm font-medium">
              <dt className="text-gray-500">Upload by</dt>
              <dd className="text-gray-900">
                {selected?.User.name} ({selected?.User.email})
              </dd>
            </div>
          </dl>
        </div>
        {/* <div>
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
        </div> */}
        {/* <div>
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
        </div> */}
        <div className="flex">
          <a
            href={selected?.url}
            target="_blank"
            className="flex-1 text-center bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            rel="noreferrer"
          >
            Download
          </a>
          {session?.user?.email === selected?.User.email && (
            <button
              type="button"
              disabled={isLoading}
              onClick={async () => {
                setLoading(true)
                await fetch(`/api/assets/${selected?.assetId}/delete`, {
                  method: 'DELETE',
                })
                window.location.reload()
              }}
              className="flex-1 ml-3 bg-white flex justify-center  py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-6 w-6 text-indigo-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                'Delete'
              )}
            </button>
          )}
        </div>
      </div>
    </Slideover>
  )
}

export default ItemDetails
