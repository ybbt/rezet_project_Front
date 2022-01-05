import { Comment } from "../Comment";

export function CommentsList({
    commentsList,
    onDeleteComment,
    onUpdateComment,
    signedUser,
}) {
    return commentsList.map((commentItem) => {
        return (
            <Comment
                comment={commentItem}
                key={commentItem.id}
                onDeleteComment={onDeleteComment}
                onUpdateComment={onUpdateComment}
                signedUserName={signedUser.name}
            />
        );
    });
}
