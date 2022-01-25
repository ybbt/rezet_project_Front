import "../styles/globals.css";

import { Provider } from "react-redux";
import { useStore } from "../redux/store";
// import { store } from "../redux/store"; //rtqQuery client-side
const { wrapper } = require("../redux/store");

import React, { useState } from "react";

function MyApp({ Component, pageProps }) {
    // const store = useStore(pageProps.initialReduxState); //redux vanilla

    const getLayout = Component.getLayout || ((page) => page);

    return (
        // <Provider store={store}>//rtkQuery client-side
        getLayout(<Component {...pageProps} />)
        // </Provider>
    );
}

// export default MyApp;

export default wrapper.withRedux(MyApp);
