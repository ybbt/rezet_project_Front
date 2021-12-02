import { useState, useEffect } from "react";
import axios from "axios";

import { EditPostForm } from "../EditPostForm"; //! на майбутнє

// import { DropdownEditDeliteComponent } from "../DropdownEditDeliteComponent";

export function PostComponent({ post, onDeletePost }) {
    const [componentEditCondition, setComponentEditCondition] = useState(false);
    const [textContent, setTextContent] = useState(post.text);

    // function handleTextChange(e) {
    //     // ? Деструктуризація
    //     setTextContent(e.target.value);
    // }

    function handleEdit() {
        setComponentEditCondition(true);
    }

    async function handleDelite() {
        // ? Перенести в батьківську компоненту
        // TODO Організувати адреси
        const response = await axios.delete(
            `http://127.0.0.1:8000/api/posts/${post.id}`
        );

        console.log(response);
        if (response.status === 204) {
            onDeletePost(post);
        }
    }

    async function handleSave(content) {
        setComponentEditCondition(false);

        // ? Перенести в батьківську компоненту
        // TODO Організувати адреси
        const response = await axios.put(
            `http://127.0.0.1:8000/api/posts/${post.id}`,
            {
                text: content,
            }
        );
        setTextContent(content);
    }

    function handleCancel() {
        setComponentEditCondition(false);
    }

    const displayContent = componentEditCondition ? (
        // <textarea value={textContent} onChange={handleTextChange} />
        <EditPostForm
            editContent={textContent}
            // onChange={handleTextChange}
            onSave={handleSave}
            onCancel={handleCancel}
        />
    ) : (
        <div>{textContent}</div>
    );

    return (
        <>
            <DropdownEditDeliteComponent
                onDelite={handleDelite}
                onEdit={handleEdit}
            />
            <div>{post.created_at}</div>
            {displayContent}
            {/* <div>
                <button onClick={handleSaveClick}>Save</button>
                <button onClick={handleCancelClick}>Cancel</button>
            </div> */}
        </>
    );
}

function DropdownEditDeliteComponent(/* props */ { onEdit, onDelite }) {
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

// function EditPostForm({ editContent, onChange, onSave, onCancel }) {
//     const [Content, setTextContent] = useState(editContent);
//     const buttonCancel = Content ? (
//         <button onClick={onCancel}>Cancel</button>
//     ) : (
//         <></>
//     );

//     function handleSave() {
//         onSave(Content);
//     }

//     function handleChange(e) {
//         // ? Деструктуризація
//         setTextContent(e.target.value);
//     }

//     return (
//         <>
//             <textarea value={Content} onChange={handleChange} />
//             <div>
//                 <button onClick={handleSave}>Save</button>
//                 {buttonCancel}
//             </div>
//         </>
//     );
// }
