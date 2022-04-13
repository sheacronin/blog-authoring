import '../styles/Post.css';
import { formatRelative, parseISO } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Post({ post, setPosts, setPost, isSinglePost }) {
    let navigate = useNavigate();
    const [isPromptingToDelete, setIsPromptingToDelete] = useState(false);

    async function togglePostPublished() {
        const res = await fetch(
            `https://blog-api-sc.herokuapp.com/posts/${post._id}/toggle-published`,
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

    function promptToDelete() {
        setIsPromptingToDelete(true);
    }

    function stopDeletePrompt() {
        setIsPromptingToDelete(false);
    }

    async function deletePost() {
        await fetch(`https://blog-api-sc.herokuapp.com/posts/${post._id}`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });

        if (isSinglePost) {
            navigate('/');
        } else {
            setPosts((prevPosts) =>
                prevPosts.filter((aPost) => aPost._id !== post._id)
            );
        }
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
            <div className="post-buttons">
                <button className="edit-button" onClick={handleEditPostClick}>
                    Edit
                </button>
                <button className="delete-button" onClick={promptToDelete}>
                    Delete
                </button>
                <p className="post-status">
                    {post.isPublished ? 'Published ✅' : 'Draft Post 📝'}
                </p>
                <button
                    onClick={togglePostPublished}
                    className="publish-button"
                >
                    {post.isPublished ? 'Unpublish' : 'Publish'}
                </button>
            </div>
            {isPromptingToDelete && (
                <div className="delete-prompt">
                    Are you sure you want to delete this post?{' '}
                    <button className="delete-button" onClick={deletePost}>
                        Yes
                    </button>{' '}
                    <button onClick={stopDeletePrompt}>No</button>
                </div>
            )}
            {!isSinglePost && (
                <div className="view-comments">
                    <Link to={`/posts/${post._id}`}>View Comments</Link>
                </div>
            )}
        </article>
    );
}

export default Post;
