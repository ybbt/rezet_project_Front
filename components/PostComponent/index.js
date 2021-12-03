import { useState, useEffect } from "react";
import axios from "axios";

import { EditPostComponent } from "../EditPostComponent";

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
        <EditPostComponent
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

function DropdownEditDeliteComponent({ onEdit, onDelete }) {
    const [componentCondition, setComponentCondition] = useState(false);

    function handleDropdownClick() {
        setComponentCondition(!componentCondition);
    }

    function handleEditClick() {
        onEdit();
        handleDropdownClick();
    }

    function handleDeleteClick() {
        onDelete();
        handleDropdownClick();
    }

    const dropdownMenu = componentCondition ? (
        <>
            <div>
                <button onClick={handleEditClick}>Edit</button>
                <button onClick={handleDeleteClick}>Delite</button>
            </div>
        </>
    ) : null;

    return (
        <>
            <button onClick={handleDropdownClick}>...</button>
            {dropdownMenu}
        </>
    );
}
