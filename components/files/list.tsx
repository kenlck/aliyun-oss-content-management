import { SearchContext } from '@context/search'
import { classNames } from '@lib/classNames'
import fetcher from '@lib/fetcher'
import { Asset } from '@prisma/client'
import numeral from 'numeral'
import { useContext } from 'react'
import useSWRInfinite from 'swr/infinite'

const PAGE_SIZE = 15

const FileList: React.FC = () => {
  const { state, dispatch } = useContext(SearchContext)

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) => `/api/assets/list?pageSize=${PAGE_SIZE}&page=${index + 1}&search=${state.query ?? ''}`,
    fetcher,
  )

  console.log(data)
  const files: Asset[] = data ? [].concat(...data) : []
  console.log(files)
  const isLoadingInitialData = !data && !error
  const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)
  const isRefreshing = isValidating && data && data.length === size

  return (
    <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
      <h2 id="gallery-heading" className="sr-only">
        All Files
      </h2>
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
      >
        {files.map((file) => {
          return (
            <li key={`${file.assetId}`} className="relative">
              <div
                onClick={() => {
                  if (file.assetId === state.selectedId) {
                    dispatch({ type: 'update_selected', selected: '' })
                  } else {
                    dispatch({ type: 'update_selected', selected: file.assetId })
                  }
                }}
                className={classNames(
                  file.assetId === state.selectedId ? 'ring-2 ring-offset-2 ring-indigo-500' : 'focus:outline-none',
                  'group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden',
                )}
              >
                {file?.type?.includes('image') ? (
                  <img
                    src={file.url}
                    alt=""
                    className={classNames(
                      file.assetId === state.selectedId ? '' : 'group-hover:opacity-75',
                      'object-cover pointer-events-none focus:outline-none',
                    )}
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 m-auto"
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
                <button type="button" className="absolute inset-0 focus:outline-none">
                  <span className="sr-only">View details for {file.filename}</span>
                </button>
              </div>
              <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                {file.filename}
              </p>
              <p className="block text-sm font-medium text-gray-500 pointer-events-none">
                {numeral(file.size).format('0.00 b')}
              </p>
            </li>
          )
        })}
        {/* {myFiles.map((file) => (
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
            <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{file.name}</p>
            <p className="block text-sm font-medium text-gray-500 pointer-events-none">{file.size}</p>
          </li>
        ))} */}
      </ul>
    </section>
  )
}

export default FileList
