import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme'; //ここにグローバルCSSを定義

import { SWRConfig } from 'swr';//SWRのグローバルコンフィグ用
import axios from 'axios';

import Nav from '../components/Nav'; //App Bar用

axios.defaults.baseURL = 'http://localhost:4001';

export default function MyApp(props: AppProps) {
    const { Component, pageProps } = props;

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement!.removeChild(jssStyles);
        }
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>My page</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />

                {/* App Barを配置 */}
                <Nav />
                <SWRConfig
                    value={
                        {
                            dedupingInterval: 5000,
                            fetcher: (url: string) => axios(url).then(r => r.data)
                        }
                    }
                >

                    <Component {...pageProps} />

                </SWRConfig>


            </ThemeProvider>
        </React.Fragment>
    );
}