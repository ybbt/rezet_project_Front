import Image from "next/image";

export function UserBanner({ user /* , onLogout */ }) {
    return (
        <div className="flex w-full">
            <div className="pr-4 ">
                <Image
                    src="/avatar.png"
                    width="40px"
                    height="40px"
                    // className="w-10 "
                />
            </div>
            <div className="">
                <div>XXXXX</div>
                <div className="text-[#949494] text-[0.625rem]">{`@${user.name}`}</div>
            </div>
        </div>
    );
}
