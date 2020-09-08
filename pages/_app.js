import {useEffect} from 'react'
import {Provider, useSelector} from 'react-redux'
import {createWrapper} from 'next-redux-wrapper'
import Layout from '../components/Layout';

// import '../css/style.css'


import {store, persistor} from '../components/store';

import { PersistGate } from 'redux-persist/integration/react';
import { loadUser } from '../components/actions/authActions';

// import client from '../utils/apollo';

function MyApp({ Component, pageProps }) {
    // const {isAuthenticated} = useSelector(state => state.auth)
    // useEffect( () => {
    //     isAuthenticated ? store.dispatch(loadUser()) : null
    // }, [isAuthenticated] )
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
            </PersistGate>
        </Provider>
    )
  }
  
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
//   MyApp.getInitialProps = async (appContext) => {
//     // calls page's `getInitialProps` and fills `appProps.pageProps`
//     const appProps = await App.getInitialProps(appContext);
  
//     return { ...appProps }
//   }
  const makeStore = () => store;
  const wrapper = createWrapper(makeStore, {debug: true})
  
  export default wrapper.withRedux(MyApp);
