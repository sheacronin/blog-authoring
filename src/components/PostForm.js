import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/PostForm.css';

function PostForm({ isEditing }) {
    let navigate = useNavigate();
    let params = useParams();
    const { postId } = params;
    const [errors, setErrors] = useState([]);
    const [post, setPost] = useState(null);
    const [isPublishedChecked, setIsPublishedChecked] = useState(false);

    function handleIsPublishedChange() {
        setIsPublishedChecked((prevChecked) => !prevChecked);
    }

    useEffect(() => {
        if (isEditing) {
            fetchPost().then((data) => {
                setPost(data);
                setIsPublishedChecked(data.isPublished);
            });
        }

        async function fetchPost() {
            const res = await fetch(`http://localhost:3001/posts/${postId}`, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            });
            const data = await res.json();
            return data;
        }
    }, [isEditing, postId]);

    async function handlePostFormSubmission(e) {
        e.preventDefault();
        setErrors([]);

        const { title, content, isPublished } = e.target.elements;

        let res;

        if (isEditing) {
            res = await editExistingPost();
        } else {
            res = await createNewPost();
        }

        const data = await res.json();

        if (res.status === 200) {
            navigate('/');
        } else {
            setErrors((prevErrors) => [...prevErrors, data.message]);
            if (data.errors) {
                const errorMessages = data.errors.map((error) => error.msg);
                setErrors((prevErrors) => [...prevErrors, ...errorMessages]);
            }
        }

        async function editExistingPost() {
            const res = await fetch(`http://localhost:3001/posts/${post._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title: title.value,
                    content: content.value,
                    isPublished: isPublished.checked,
                }),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            });
            return res;
        }

        async function createNewPost() {
            const res = await fetch('http://localhost:3001/posts', {
                method: 'POST',
                body: JSON.stringify({
                    title: title.value,
                    content: content.value,
                    isPublished: isPublished.checked,
                }),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            });
            return res;
        }
    }

    return (
        <form className="form post-form" onSubmit={handlePostFormSubmission}>
            <div className="post-form-info">
                <h2>Create a Post</h2>

                <div className="is-published">
                    <input
                        type="checkbox"
                        id="isPublished"
                        name="isPublished"
                        checked={isPublishedChecked}
                        onChange={handleIsPublishedChange}
                    />
                    <label htmlFor="isPublished">Publish Post?</label>
                </div>
            </div>

            <label htmlFor="title">Post Title:</label>
            <input
                type="text"
                id="title"
                name="title"
                defaultValue={post !== null ? post.title : ''}
            />

            <label htmlFor="content">Post Content:</label>
            <textarea
                id="content"
                name="content"
                defaultValue={post !== null ? post.content : ''}
            />

            <button type="submit">Submit Post</button>
            {errors.length > 0 && (
                <section className="errors">
                    <ul>
                        {errors.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </section>
            )}
        </form>
    );
}

export default PostForm;
