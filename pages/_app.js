import "../styles/globals.css";
// import "antd/dist/antd.css";

import React, { useState } from "react";

// var signedUserContext = React.createContext(null);
import signedUserContext from "../context/signedUserContext";

function MyApp({ Component, pageProps }) {
    var [signedUserAppContext, setSignedUserAppContext] = useState({});

    return (
        <signedUserContext.Provider
            value={[signedUserAppContext, setSignedUserAppContext]}
        >
            <Component {...pageProps} />
        </signedUserContext.Provider>
    );
}

export default MyApp;
