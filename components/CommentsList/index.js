import { Comment } from "../Comment";

import { useSelector } from "react-redux";

export function CommentsList({
    commentsList,
    onDeleteComment,
    onUpdateComment,
    signedUser,
}) {
    const commentsListStore = useSelector(
        (state) => state.commentsReducer.commentsList
    );

    return commentsListStore.map((commentItem) => {
        return (
            <Comment
                comment={commentItem}
                key={commentItem.id}
                onDeleteComment={onDeleteComment}
                onUpdateComment={onUpdateComment}
            />
        );
    });
}
