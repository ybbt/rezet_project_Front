import "../styles/globals.css";

import { Provider } from "react-redux";
import { useStore } from "../redux/store";

import React, { useState } from "react";

function MyApp({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState);

    const getLayout = Component.getLayout || ((page) => page);

    return (
        <Provider store={store}>
            {getLayout(<Component {...pageProps} />)}
        </Provider>
    );
}

export default MyApp;
