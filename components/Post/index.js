import { useState, useEffect } from "react";
import axios from "axios";

import { EditPost } from "../EditPost";
import { PostDropdown } from "../PostDropdown";

export function Post({ post, onDeletePost, onUpdatePost }) {
    const [componentEditCondition, setComponentEditCondition] = useState(false);
    // const [textContent, setTextContent] = useState(post.text);

    // useEffect(() => {
    //     setTextContent(post.text);
    // }, [post.text]);

    function handleEdit() {
        setComponentEditCondition(true);
    }

    async function handleUdate(content) {
        setComponentEditCondition(false);

        const newPost = { ...post };

        newPost.text = content;

        onUpdatePost(newPost);

        // setTextContent(content);
    }

    function handleCancel() {
        setComponentEditCondition(false);
    }

    const displayContent = componentEditCondition ? (
        <EditPost
            editContent={/* textContent */ post.text}
            onSave={handleUdate}
            onCancel={handleCancel}
        />
    ) : (
        <div>{/* textContent */ post.text}</div>
    );

    return (
        <>
            <PostDropdown
                onDelete={() => {
                    onDeletePost(post);
                }}
                onEdit={handleEdit}
            />
            <div>{post.created_at}</div>
            {displayContent}
        </>
    );
}
