export function UserBanner({ user /* , onLogout */ }) {
    return (
        <div className="flex w-full">
            <div className="pr-4 ">
                <img src="avatar.png" className="w-10 "></img>
            </div>
            <div className="">
                <div>XXXXX</div>
                <div className="text-[#949494] text-[0.625rem]">{`@${user.name}`}</div>
            </div>
        </div>
    );
}
