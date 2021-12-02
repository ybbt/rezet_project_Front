import { useState, useEffect } from "react";
import axios from "axios";
import { PostComponet } from "../components/PostComponent";
import { WhatsUpTweetComponent } from "../components/WhatsUpTweetComponent";

export default function Index({ posts_data }) {
    const [posts, setPosts] = useState(posts_data.data);

    // useEffect(()=>{
    //     async function load(){
    //         const response = await fetch("http://127.0.0.1:8000/api/posts");
    //         const json = await response.json();
    //     setPosts(json);
    //     }
    //   load();
    // }, [])
    // console.log(posts[0], "posts");

    function handleAddPost(post) {
        // alert(post);
        setPosts([...posts, post]);
    }

    function handleDeletePost(post) {
        const newPosts = posts.filter((item) => item.id !== post.id);
        // alert(findedPost);
        // const newPosts = posts.splice(findedPost, 1);
        setPosts(newPosts);
    }

    return (
        <>
            <WhatsUpTweetComponent onAddPost={handleAddPost} />
            {posts.map((item) => {
                return (
                    <PostComponet
                        post={item}
                        key={item.id}
                        onDeletePost={handleDeletePost}
                    />
                );
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
        posts_data: res.data,
    };
};
