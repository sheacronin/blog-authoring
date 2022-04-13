import '../styles/Post.css';
import { formatRelative, parseISO } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';

function Post({ post, setPosts, setPost, isSinglePost }) {
    let navigate = useNavigate();

    async function togglePostPublished() {
        const res = await fetch(
            `http://localhost:3001/posts/${post._id}/toggle-published`,
            {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            }
        );

        const data = await res.json();

        if (!isSinglePost) {
            setPosts((prevPosts) => {
                const newPosts = [...prevPosts];
                const index = newPosts.findIndex(
                    (aPost) => aPost._id === post._id
                );
                newPosts[index] = {
                    ...newPosts[index],
                    isPublished: data.post.isPublished,
                };

                return newPosts;
            });
        } else {
            setPost((prevPost) => {
                return { ...prevPost, isPublished: !prevPost.isPublished };
            });
        }
    }

    function handleEditPostClick() {
        navigate(`/edit-post/${post._id}`);
    }

    return (
        <article className="post">
            <div className="post-info">
                <h2>{post.title}</h2>
                <p className="post-timestamp">
                    {formatRelative(parseISO(post.timestamp), new Date())}
                </p>
            </div>
            <p>{post.content}</p>
            <div className="post-publish">
                <button className="edit-button" onClick={handleEditPostClick}>
                    Edit
                </button>
                <p className="post-status">
                    {post.isPublished ? 'Published ✅' : 'Draft Post 📝'}
                </p>
                <button onClick={togglePostPublished}>
                    {post.isPublished ? 'Unpublish' : 'Publish'}
                </button>
            </div>
            {!isSinglePost && (
                <div className="view-comments">
                    <Link to={`/posts/${post._id}`}>View Comments</Link>
                </div>
            )}
        </article>
    );
}

export default Post;
