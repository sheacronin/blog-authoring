import { formatRelative, parseISO } from 'date-fns';
import '../styles/Comment.css';

function Comment({ comment, postId, setPost }) {
    async function deleteComment() {
        await fetch(
            `https://blog-api-sc.herokuapp.com/posts/${postId}/comments/${comment._id}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            }
        );

        setPost((prevPost) => {
            const newPost = { ...prevPost };
            newPost.comments = newPost.comments.filter(
                (aComment) => aComment._id !== comment._id
            );
            return newPost;
        });
    }

    return (
        <div className="comment">
            <div className="comment-info">
                <h4 className="comment-author">
                    {comment.author.displayName} says...
                </h4>
                <p className="comment-timestamp">
                    {formatRelative(parseISO(comment.timestamp), new Date())}
                </p>
            </div>
            <p>{comment.content}</p>
            <div className="delete-comment-container">
                <button onClick={deleteComment}>Delete Comment</button>
            </div>
        </div>
    );
}

export default Comment;
