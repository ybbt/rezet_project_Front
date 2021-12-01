import { useState, useEffect } from "react";
import axios from "axios";

export function WhatsUpTweetComponent() {
    const [textContent, setTextContent] = useState([]);

    function handlerTweetClick(e) {
        //!
        // TODO Переделать в async/awaite
        // TODO Перенести в батьківську компоненту
        // TODO Організувати адреси
        axios
            .post("http://127.0.0.1:8000/api/posts", {
                text: textContent,
            })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        //TODO Прописати умову, що тільки якщо позитивна відповідь від серверу
        setTextContent("");
    }

    function handleTextChange(e) {
        // TODO Деструктуризація
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
