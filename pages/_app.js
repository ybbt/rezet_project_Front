import "../styles/globals.css";

import React, { useState } from "react";

import signedUserContext from "../context/signedUserContext";

function MyApp({ Component, pageProps }) {
    var [signedUser, setSignedUser] = useState({});

    return (
        <signedUserContext.Provider value={[signedUser, setSignedUser]}>
            <Component {...pageProps} />
        </signedUserContext.Provider>
    );
}

export default MyApp;
