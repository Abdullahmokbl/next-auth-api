import '../styles/globals.css';
import { wrapper } from './../redux/store';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/Layout';
import Head from 'next/head';

// next font-awesome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Provider } from 'react-redux';
config.autoAddCss = false

function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <Provider store={store}>
      <SessionProvider session={props.session}>
        <Head>
          <title>Shopping</title>
          <link rel="icon" type="image/x-icon" href="/flower.png" />
        </Head>
        <Layout>
          <Component {...props.pageProps} />
        </Layout>
      </SessionProvider>
    </Provider>
  )
}

export default MyApp;
