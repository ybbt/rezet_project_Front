import { useState, useEffect } from "react";
import { PostComponet } from "../components/PostComponent";

export default function Index({ posts }) {
    // const [posts, setPosts] = useState([]);

    // useEffect(()=>{
    //     async function load(){
    //         const response = await fetch("http://127.0.0.1:8000/api/posts");
    //         const json = await response.json();
    //     setPosts(json);
    //     }
    //   load();
    // }, [])

    return (
        <>
            <h1>Posts</h1>
            {posts.data.map((item) => {
                return <PostComponet post={item} key={item.id} />;
            })}
        </>
    );
}

Index.getInitialProps = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/posts");
    const posts = await response.json();

    return {
        posts,
    };
};
