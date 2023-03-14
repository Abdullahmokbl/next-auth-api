import '../styles/globals.css'
import { wrapper } from './../redux/store'
import { SessionProvider } from 'next-auth/react'
import Layout from '../components/Layout'
import Meta from '../components/Meta'
import { Provider } from 'react-redux'
import { useRouter } from 'next/router'
// import { useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import AdminLayout from './admin/components/AdminLayout'
// import { PayPalScriptProvider } from '@paypal/react-paypal-js'
// import { v4 as uuid } from 'uuid'
// import { addGuest } from '../redux/usersSlice'
import { appWithTranslation } from 'next-i18next'
// toastify css
import 'react-toastify/dist/ReactToastify.css'

// next font-awesome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

// next/font
import { Nunito, Noto_Naskh_Arabic } from '@next/font/google'

const nunito = Nunito({
  subsets: ['latin'],
  // weight: ["400"],
})
const arabic = Noto_Naskh_Arabic({ subsets: ['latin'] })

const theme = 'dark'

// const initialOptions = {
//   'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
//   // currency: 'USD',
//   // intent: 'capture',
//   // 'data-client-token': process.env.PAYPAL_CLIENT_SECRET,
// }
function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { locale, pathname } = useRouter()
  // console.log(rest)

  // add Guest to database
  // useEffect(() => {
  //   const add_guest = async guestId => {
  //     await store
  //       .dispatch(addGuest(guestId))
  //       .then(() => localStorage.setItem('guestId', guestId))
  //       .catch(e => console.log(e))
  //   }
  //   if (!localStorage.getItem('guestId')) {
  //     const guestId = uuid()
  //     add_guest(guestId)
  //   }
  // }, [])

  return (
    <Provider store={store}>
      <SessionProvider>
        <ThemeProvider>
          {/* <PayPalScriptProvider options={initialOptions}> */}
          <Meta title={Component.name} />
          <main dir={locale === 'ar' ? 'rtl' : 'ltr'} className={locale === 'ar' ? arabic.className : nunito.className}>
            {pathname.startsWith('/admin') ? (
              <AdminLayout>
                <Component {...props.pageProps} />
              </AdminLayout>
            ) : (
              <Layout>
                <Component {...props.pageProps} />
              </Layout>
            )}
          </main>
          {/* </PayPalScriptProvider> */}
        </ThemeProvider>
      </SessionProvider>
    </Provider>
  )
}

export default appWithTranslation(MyApp)
