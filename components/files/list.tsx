const FileList: React.FC = () => {
  return (
    <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
      <h2 id="gallery-heading" className="sr-only">
        All Files
      </h2>
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
      >
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
