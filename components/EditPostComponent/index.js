import { useState, useEffect } from "react";

export function EditPostComponent({ editContent, onUpdate, onCancel }) {
    const [content, setTextContent] = useState(editContent);

    const buttonCancel = editContent ? (
        <button onClick={onCancel}>Cancel</button>
    ) : null;

    const nameSaveButton = editContent ? "Save" : "Tweet";

    function handleSave() {
        if (!content) {
            //! Тимчасово, щоб не отримувати помилки з серверу
            alert("Empty field!");
            return;
        }
        onUpdate(content);
        setTextContent("");
    }

    function handleChange(e) {
        setTextContent(e.target.value);
    }

    return (
        <>
            <textarea value={content} rows="5" onChange={handleChange} />
            <div>
                <button onClick={handleSave}>{nameSaveButton}</button>
                {buttonCancel}
            </div>
        </>
    );
}
