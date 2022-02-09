import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import SearchProvider from '@context/search'
import { SessionProvider } from 'next-auth/react'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <SessionProvider>
      <SearchProvider>
        <Component {...pageProps} />
      </SearchProvider>
    </SessionProvider>
  )
}
export default MyApp
