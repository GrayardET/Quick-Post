import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import Layout from '@/components/Layout'
import LoginModal from '../components/modals/LoginModal';
import RegisterModal from '../components/modals/RegisterModal';
import EditModal from '../components/modals/EditModal'; 
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
    <Provider store={store}>
      
        <Toaster />
        <EditModal />
        <RegisterModal />
        <LoginModal />
        <Layout>
          <Component {...pageProps} />  
        </Layout>
      
    </Provider>
    </SessionProvider>
    
  )
}
