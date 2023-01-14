import '../styles/globals.css';
import { wrapper } from './../redux/store';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/Layout';
import Meta from '../components/Meta';

// next font-awesome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Provider } from 'react-redux';
import dynamic from 'next/dynamic';
config.autoAddCss = false

function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest)
  // match client with server
  // const Layout = dynamic(() => import("../components/Layout"), {ssr:false})
  return (
    <Provider store={store}>
      <SessionProvider session={props.pageProps.session}>
        <Meta title={Component.name} />
        <Layout>
          <Component {...props.pageProps} />
        </Layout>
      </SessionProvider>
    </Provider>
  )
}

export default MyApp;
