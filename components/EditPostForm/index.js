import { useState } from "react";

export function EditPostForm({ editContent, onSave, onCancel }) {
    const [Content, setTextContent] = useState(editContent);
    const buttonCancel = Content ? (
        <button onClick={onCancel}>Cancel</button>
    ) : (
        <></>
    );

    function handleSave() {
        onSave(Content);
    }

    function handleChange(e) {
        // ? Деструктуризація
        setTextContent(e.target.value);
    }

    return (
        <>
            <textarea value={Content} onChange={handleChange} />
            <div>
                <button onClick={handleSave}>Save</button>
                {buttonCancel}
            </div>
        </>
    );
}
