import { useState, useEffect } from "react";
import axios from "axios";
import { PostComponet } from "../components/PostComponent";
import { WhatsUpTweetComponent } from "../components/WhatsUpTweetComponent";

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
    // console.log(posts[0], "posts");

    return (
        <>
            <WhatsUpTweetComponent />
            {posts.data.map((item) => {
                return <PostComponet post={item} key={item.id} />;
            })}
            {/* <pre>{posts}</pre> */}
        </>
    );
}

Index.getInitialProps = async () => {
    // const response = await fetch("http://127.0.0.1:8000/api/posts");
    // const posts = await response.json();

    // return {
    //     posts,
    // };

    const res = await axios.get("http://127.0.0.1:8000/api/posts");

    return {
        posts: res.data,
    };
};
