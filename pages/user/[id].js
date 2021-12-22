import { useRouter } from "next/router";
import { useState, /* useEffect, */ useContext } from "react";

import axiosInstance from "../../libs/axiosInstance";

import signedUserContext from "../../context/signedUserContext";

export default ({ user }) => {
    const [signedUserAppContext, setSignedUserAppContext] =
        useContext(signedUserContext);

    const router = useRouter();
    return (
        <div>
            <div>{signedUserAppContext.name}</div>
            <div>Страница пользователя</div>
            <div>{router.query.id}</div>
            <div>{user.id}</div>
            <div>{user.name}</div>
        </div>
    );
};

export async function getServerSideProps /* getStaticProps */({ params }) {
    console.log(params.id, "serverSideProps new");

    const resultUser = await axiosInstance.get(`/users/${params.id}`);
    const resultUserPosts = await axiosInstance.get(
        `/users/${params.id}/posts`
    );

    console.log(resultUser.data, "resultUser");
    console.log(resultUserPosts.data, "resultUserPosts");

    return {
        props: {
            user: resultUser.data,
            posts: resultUserPosts.data,
        },
    };
}
