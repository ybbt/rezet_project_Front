import { useState /* useEffect */ } from "react";
import axios from "axios";
import { PostListComponent } from "../components/PostListComponent";
import { WhatsUpTweetComponent } from "../components/WhatsUpTweetComponent";
import { EditPostForm } from "../components/EditPostForm"; //! На майбутнє

export default function Index({ postsList }) {
    const [posts, setPosts] = useState(postsList);

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
        setPosts([...posts, post]);
    }

    function handleDeletePost(post) {
        const newPosts = posts.filter((item) => item.id !== post.id);
        setPosts(newPosts);
    }

    return (
        <>
            <EditPostForm onSave={handleAddPost} />
            <WhatsUpTweetComponent onAddPost={handleAddPost} />
            <PostListComponent
                postsList={posts}
                onDeletePost={handleDeletePost}
            />
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
        postsList: res.data.data,
    };
};
