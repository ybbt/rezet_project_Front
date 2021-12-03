import { useState, useEffect } from "react";
import axios from "axios";

import { EditPostForm } from "../EditPostForm";

export function PostComponent({ post, onDeletePost, onUpdatePost }) {
    const [componentEditCondition, setComponentEditCondition] = useState(false);
    const [textContent, setTextContent] = useState(post.text);

    useEffect(() => {
        setTextContent(post.text);
    }, [post.text]);

    function handleEdit() {
        setComponentEditCondition(true);
    }

    async function handleUdate(content) {
        setComponentEditCondition(false);

        post.text = content;

        onUpdatePost(post);

        // setTextContent(content);
    }

    function handleCancel() {
        setComponentEditCondition(false);
    }

    const displayContent = componentEditCondition ? (
        <EditPostForm
            editContent={textContent}
            onUpdate={handleUdate}
            onCancel={handleCancel}
        />
    ) : (
        <div>{textContent}</div>
    );

    return (
        <>
            <DropdownEditDeliteComponent
                onDelite={() => {
                    onDeletePost(post);
                }}
                onEdit={handleEdit}
            />
            <div>{post.created_at}</div>
            {displayContent}
        </>
    );
}

function DropdownEditDeliteComponent({ onEdit, onDelite }) {
    const [componentCondition, setComponentCondition] = useState(false);

    function handlDropdownClick() {
        setComponentCondition(!componentCondition);
    }

    return (
        <>
            <button onClick={handlDropdownClick}>...</button>
            <div>
                <button onClick={onEdit}>Edit</button>
                <button onClick={onDelite}>Delite</button>
            </div>
        </>
    );
}
