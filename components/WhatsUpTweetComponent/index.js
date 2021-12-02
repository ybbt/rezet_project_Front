import { useState, useEffect } from "react";
import axios from "axios";

export function WhatsUpTweetComponent({ onAddPost }) {
    const [textContent, setTextContent] = useState([]);

    async function handlerTweetClick(e) {
        const response = await axios.post("http://127.0.0.1:8000/api/posts", {
            text: textContent,
        });

        onAddPost(response.data.data);

        if (response.status === 201) {
            setTextContent("");
        }

        //
        // ? Перенести в батьківську компоненту?
        // TODO Організувати адреси
    }

    function handleTextChange(e) {
        // ? Деструктуризація
        setTextContent(e.target.value);
    }

    return (
        <>
            <h1>Whats up?</h1>
            <textarea
                rows="5"
                name="text"
                value={textContent}
                onChange={handleTextChange}
            />
            <button onClick={handlerTweetClick}>Tweet</button>
        </>
    );
}
