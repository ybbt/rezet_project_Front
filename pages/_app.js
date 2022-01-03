import "../styles/globals.css";
// ********************** with-redux-thunk
import { Provider } from "react-redux";
import { useStore } from "../redux/store";
// **********************

import React, { useState } from "react";

import signedUserContext from "../context/signedUserContext";

function MyApp({ Component, pageProps }) {
    var [signedUser, setSignedUser] = useState({});
    // *******************
    const store = useStore(pageProps.initialReduxState);
    // *******************

    return (
        <Provider store={store}>
            <signedUserContext.Provider value={[signedUser, setSignedUser]}>
                <Component {...pageProps} />
            </signedUserContext.Provider>
        </Provider>
    );
}

export default MyApp;
