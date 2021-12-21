import { useRouter } from "next/router";

import axiosInstance from "../../libs/axiosInstance";

export default () => {
    const router = useRouter();
    return (
        <div>
            <div>Страница пользователя</div>
            <div>{router.query.id}</div>
        </div>
    );
};

export async function getServerSideProps /* getStaticProps */({ params }) {
    // const router = useRouter();
    console.log(params.id, "serverSideProps new");

    // const res = await axiosInstance.get(`/posts`);

    // console.log(res, "res");

    return {
        post: "query.id",
    };
}
