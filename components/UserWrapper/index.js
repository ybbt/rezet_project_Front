import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";
import Geocode from "react-geocode";

export function UserWrapper({ user }) {
    const [address, setAddress] = useState("");

    const avatarPath = user.avatar_path ?? "/avatar.png";

    //TODO винести в ХУК
    useEffect(async () => {
        console.log(user);
        const API_KEY = "AIzaSyB_aINHPQ0-Z4SI_nYOUSzbAYeJ_auuSwE";
        Geocode.setApiKey(API_KEY);
        const response = await Geocode.fromLatLng(user.lat, user.lng);
        console.log(response, "response");
        const address = response.results[0].formatted_address;
        setAddress(address);
    }, [user]);

    return (
        <div className="flex flex-col relative">
            <Image src="/cover.png" width="720" height="120" />
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
                    <div className="font-bold text-lg">{`${user.first_name} ${
                        user.last_name || ""
                    }`}</div>
                    <div className="text-xs text-[#949494]">
                        <Link href="#">
                            <a className="text-inherit">{`@${user.name}`}</a>
                        </Link>
                    </div>
                    <div className="my-4 text-[0.625rem] text-[#5f5f5f]">
                        {address}
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
