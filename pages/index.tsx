import Layout from '@components/layout/layout'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Index: React.FC = () => {
  // const { data } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (router) {
      router.push('/dashboard')
    }
  }, [router])
  return <div></div>
}

export default Index
