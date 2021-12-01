export function PostComponet(props) {
    return (
        <>
            <div>{props.post.created_at}</div>
            <textarea rows="5" name="text" defaultValue={props.post.text} />
        </>
    );
}
