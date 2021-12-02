import { useState, useEffect } from "react";
import axios from "axios";
export function PostComponet(props) {
    const [componentEditCondition, setComponentEditCondition] = useState(false);
    const [textContent, setTextContent] = useState(props.post.text);

    /*   useEffect(() => {
        // alert();
        setTextContent(props.post.text);
    }); */

    function handleTextChange(e) {
        // TODO Деструктуризація
        setTextContent(e.target.value);
    }

    function handleEditClick() {
        setComponentEditCondition(true);
    }

    function handleDeliteClick() {
        //!
        // TODO Переделать в async/awaite
        // TODO Перенести в батьківську компоненту
        // TODO Організувати адреси
        axios
            .delete(`http://127.0.0.1:8000/api/posts/${props.post.id}`, {})
            .then(function (response) {
                console.log(response.data);

                props.onDeletePost(props.post);
            })
            .catch(function (error) {
                console.log(error);
            });
        //TODO Прописати умову, що тільки якщо позитивна відповідь від серверу
        // setTextContent("");
    }

    function handleSaveClick() {
        setComponentEditCondition(false);

        //!
        // TODO Переделать в async/awaite
        // TODO Перенести в батьківську компоненту
        // TODO Організувати адреси
        axios
            .put(`http://127.0.0.1:8000/api/posts/${props.post.id}`, {
                text: textContent,
            })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        //TODO Прописати умову, що тільки якщо позитивна відповідь від серверу
        // setTextContent("");
    }

    function handleCancelClick() {
        setComponentEditCondition(false);
    }

    return (
        <>
            <div>
                <button onClick={handleEditClick}>Edit</button>
                <button onClick={handleDeliteClick}>Delite</button>
            </div>
            <div>{props.post.created_at}</div>
            {componentEditCondition ? (
                <textarea
                    rows="5"
                    name="text"
                    //defaultValue={props.post.text}
                    value={textContent}
                    onChange={handleTextChange}
                />
            ) : (
                <div>{textContent}</div>
            )}
            <div>
                <button onClick={handleSaveClick}>Save</button>
                <button onClick={handleCancelClick}>Cancel</button>
            </div>
        </>
    );
}
