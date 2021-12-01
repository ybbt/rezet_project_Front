import { useState, useEffect } from "react";
import axios from "axios";
export function PostComponet(props) {
    const [componentEditCondition, setComponentEditCondition] = useState(false);

    return (
        <>
            <div>
                <button>Edit</button>
                <button>Delite</button>
            </div>
            <div>{props.post.created_at}</div>
            {componentEditCondition ? (
                <textarea rows="5" name="text" defaultValue={props.post.text} />
            ) : (
                <div>{props.post.text}</div>
            )}
            <div>
                <button>Save</button>
                <button>Cancel</button>
            </div>
        </>
    );
}
