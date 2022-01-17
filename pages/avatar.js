import Image from "next/image";
import { useEffect, useState } from "react";
import axiosInstance from "../libs/axiosInstance";

export default function avatar() {
    const [urlAva, setUrlAva] = useState("/public/avatar.png");
    useEffect(async () => {
        try {
            const result = await axiosInstance.get("/me/avatar");

            setUrlAva(`http://127.0.0.1:8000/${result.data}`);

            console.log(result, "result in result");
        } catch (error) {
            console.log(error.response, "error in useEffect");
            // console.log("Token wrong, user don`t signed");
        }
    }, []);

    return (
        <>
            <div>
                <Image src={urlAva} width="140" height="140" />
            </div>
            <div></div>
        </>
    );
}
