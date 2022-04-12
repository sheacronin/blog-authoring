import '../styles/Post.css';
import { formatRelative, parseISO } from 'date-fns';

function Post({ post }) {
    return (
        <article className="post">
            <div className="post-info">
                <h2>{post.title}</h2>
                <p className="post-timestamp">
                    {formatRelative(parseISO(post.timestamp), new Date())}
                </p>
            </div>
            <p>{post.content}</p>
        </article>
    );
}

export default Post;
