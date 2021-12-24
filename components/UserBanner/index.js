import Image from "next/image";

export function UserBanner({ user /* , onLogout */ }) {
    return (
        <div className="flex w-full">
            <div className="pr-4 ">
                <Image src="/avatar.png" width="40" height="40" />
            </div>
            <div className="">
                <div className="font-medium text-xs">{`${user.first_name}`}</div>
                <div className="text-[#949494] text-[0.625rem]">{`@${user.name}`}</div>
            </div>
        </div>
    );
}
