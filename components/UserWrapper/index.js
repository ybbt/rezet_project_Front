import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";
import Geocode from "react-geocode";

export function UserWrapper({ user }) {
    const [address, setAddress] = useState("no location");

    const avatarPath = user.avatar_path ?? "/avatar.png";
    const backgroundPath = user.background_path ?? "/cover.png";

    console.log(backgroundPath, "backgroundPath");

    useEffect(async () => {
        Geocode.setApiKey(process.env.NEXT_PUBLIC_API_KEY);

        let address;
        if (user.lat && user.lng) {
            const response = await Geocode.fromLatLng(user.lat, user.lng);

            address = response.results[0].formatted_address;
            setAddress(address);
        }
    }, [user]);

    return (
        <div className="flex flex-col relative">
            <Image src={backgroundPath} width="720" height="120" />
            <div className="w-[140px] h-[140px] absolute left-[50%] ml-[-70px] top-[50px] bg-white rounded-full">
                <Image
                    src={avatarPath}
                    width="140"
                    height="140"
                    className="rounded-full"
                />
            </div>
            <div className="flex justify-between px-4 py-3">
                <div className="flex flex-col">
                    <div className="font-bold text-lg">{`${user?.first_name} ${
                        user?.last_name || ""
                    }`}</div>
                    <div className="text-xs text-[#949494]">
                        <Link href="#">
                            <a className="text-inherit">{`@${user?.name}`}</a>
                        </Link>
                    </div>
                    <a
                        className="my-4 text-[0.625rem] text-[#5f5f5f]"
                        target="_blank"
                        href={`http://maps.google.com/maps?q=${user?.lat},${user?.lng}`}
                    >
                        {address}
                    </a>
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
