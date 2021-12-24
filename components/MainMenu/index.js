import Link from "next/link";
import { useContext } from "react";

import signedUserContext from "../../context/signedUserContext";

export function MainMenu({ isAuth }) {
    const [signedUserAppContext, setSignedUserAppContext] =
        useContext(signedUserContext);

    const authUserMenu = isAuth && (
        <>
            <Link href="#">
                <a className="text-black">Messages</a>
            </Link>
            <Link href="#">
                <a className="text-black">Users</a>
            </Link>
            <Link href={`/user/${signedUserAppContext.id}`}>
                <a className="text-black">Profile</a>
            </Link>
            <Link href="#">
                <a className="text-black">Settings</a>
            </Link>
        </>
    );

    return (
        <>
            <Link href="/">
                <a className="text-black">Home</a>
            </Link>
            {authUserMenu}
        </>
    );
}
