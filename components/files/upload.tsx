import { useState } from 'react'
import numeral from 'numeral'

type Props = {
  onClose: () => void
}
const FileUpload: React.FC = ({ onClose }) => {
  const [files, setFiles] = useState<FileList | null>()
  const [err, setError] = useState('')
  console.log(files)
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (!(files && files.length > 0)) {
          setError('Please select file')
        }
      }}
    >
      <div className="flex flex-col">
        <p className="mb-2 font-semibold">File Upload</p>
        {err && <p className="text-red-600 text-sm">{err}</p>}
        {files && files.length > 0 && (
          <div className="mb-4">
            <p>File Name: {files[0].name}</p>
            <p>File Size: {numeral(files[0].size).format('0.00 b')}</p>
            <p>File Type: {files[0].type}</p>
          </div>
        )}
        <input
          type="file"
          onChange={(e): void => {
            e.preventDefault()
            setFiles(e.target.files)
            setError('')
          }}
        />
        <div className="mt-2 gap-x-2 flex">
          <button className="bg-indigo-500 rounded text-white px-2 py-1">Upload</button>
          <button type="button" onClick={() => onClose()} className="rounded px-2 py-1">
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}

export default FileUpload
