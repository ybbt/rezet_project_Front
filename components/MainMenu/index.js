import Link from "next/link";

export function MainMenu() {
    return (
        <>
            <Link href="#">
                <a className="text-black">Home</a>
            </Link>
            <Link href="#">
                <a className="text-black">Messages</a>
            </Link>
            <Link href="#">
                <a className="text-black">Users</a>
            </Link>
            <Link href="#">
                <a className="text-black">Profile</a>
            </Link>
            <Link href="#">
                <a className="text-black">Settings</a>
            </Link>
        </>
    );
}
