import { useState } from 'react'
import '../styles/globals.css'
import Navbar from '../components/Navbar';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { config } from '../lib/react-query-config';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {

  // This ensures that data is not shared 
  // between different users and requests
  const [queryClient] = useState(() => new QueryClient(config))

  const router = useRouter()

  const NavbarPage = () => {
    if (router.pathname !== '/login') {
      return <Navbar />
    }
    else null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-center" />
      <Hydrate state={pageProps.dehydratedState}>
        {NavbarPage()}
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>

  )
}

export default MyApp


