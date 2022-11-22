import '../styles/global.css';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';

import DbProvider from '@/context/dbContext';
import App from '@/layouts/App';

import store from '../store/store';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Provider store={store}>
      <DbProvider>
        <App>{getLayout(<Component {...pageProps} />)}</App>
      </DbProvider>
    </Provider>
  );
};

export default MyApp;
