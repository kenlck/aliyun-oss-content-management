import Layout from '@components/layout/layout'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Index: React.FC = () => {
  const { data } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (data) {
      router.push('/dashboard')
    }
  }, [data])
  return (
    <div className="p-40 flex flex-col justify-center items-center">
      <h1>Welcome to Content Management!</h1>
      <button
        onClick={() => {
          router.push('/api/auth/signin')
        }}
        className="px-6 py-2 bg-indigo-700 rounded text-white mt-2"
      >
        Proceed to Login
      </button>
    </div>
  )
}

export default Index
