import Link from "next/link";
import Image from "next/image";

export function UserWrapper({ user }) {
    return (
        <div className="flex flex-col">
            <Image
                /* layout="fill" */ src="/cover.png"
                width="720"
                height="120"
            />
            <div className="flex justify-between px-4 py-3">
                <div className="flex flex-col">
                    <div className="font-bold text-lg">{`${user.first_name} ${
                        user.last_name || ""
                    }`}</div>
                    <div className="text-xs text-[#949494]">
                        <Link href="#">
                            <a className="text-inherit">{`@${user.name}`}</a>
                        </Link>
                    </div>
                    <div className="my-4 text-[0.625rem] text-[#5f5f5f]">
                        address
                    </div>
                    <div className="text-[0.625rem] ">
                        Following & Followers
                    </div>
                </div>
                <div>
                    <button className="bg-[#54C1FF] text-white border-[#54C1FF] border p-1 m-1 w-24 h-7 text-xs">
                        Message
                    </button>
                    <button className="bg-[#54C1FF] text-white border-[#54C1FF] border p-1 m-1 w-24 h-7 text-xs">
                        Follow
                    </button>
                </div>
            </div>
        </div>
    );
}
