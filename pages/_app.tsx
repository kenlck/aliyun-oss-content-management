import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import SearchProvider from '@context/search'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <SearchProvider>
      <Component {...pageProps} />
    </SearchProvider>
  )
}
export default MyApp
