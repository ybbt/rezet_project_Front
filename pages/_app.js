import "../styles/globals.css";

import React, { useState } from "react";

import signedUserContext from "../context/signedUserContext";

function MyApp({ Component, pageProps }) {
    const [auth, setAuth] = useState({ signedUser: {}, isLoaded: false });

    const getLayout = Component.getLayout || ((page) => page);

    return (
        <signedUserContext.Provider
            value={[auth, setAuth] /* [signedUser, setSignedUser] */}
        >
            {getLayout(<Component {...pageProps} />)}
        </signedUserContext.Provider>
    );
}

export default MyApp;
