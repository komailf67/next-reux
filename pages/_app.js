import React from 'react';
import App from 'next/app'
import store from '../redux/store2';
import {Provider} from 'react-redux';
import withRedux from 'next-redux-wrapper';
import './styles.css';

class MyApp extends  App {
    static async getInitialProps({Component ,ctx}){
        const pageProps = Component.getInitialProps ? await  Component.getInitialProps(ctx) : {} ;


        return {pageProps}
    }
    render() {
        const {
            Component,
            pageProps,
            store
        } = this.props ;
        return(
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        )
    }
}

const makeStore = () => store ;

export default withRedux(makeStore)(MyApp);