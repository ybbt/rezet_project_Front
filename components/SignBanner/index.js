import Link from "next/link";

export function SignBanner() {
    return (
        <div className="w-full bg-[#54C1FF] fixed bottom-0 h-14 flex items-center xl:justify-center before:w-40 before:min-w-[10rem] before:ml-4 xl:before:ml-0 before:content-[''] xl:before:w-0 xl:before:min-w-0">
            <div className="flex justify-between max-w-[800px] min-w-[600px] w-3/5 h-full ">
                <div className="flex flex-col">
                    <div className="text-xl text-white text-bold">
                        Stay tuned!
                    </div>
                    <div className="text-sm text-white ">
                        Sing up for Twitty! Or sign in if you already have an
                        account.
                    </div>
                </div>
                <div className="flex justify-between items-center w-[175px]">
                    <Link href="/login">
                        <a className="bg-[#54C1FF] border-white border-2 flex h-7 w-20 justify-center items-center text-white">
                            Sign In
                        </a>
                    </Link>
                    <Link href="/register">
                        <a className="bg-white  text-[#54C1FF] border-white border-2 flex h-7 w-20 justify-center items-center">
                            Sign Up
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
}
