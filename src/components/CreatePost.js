import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CreatePost.css';

function CreatePost() {
    let navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    async function handlePostFormSubmission(e) {
        e.preventDefault();
        setErrors([]);

        const { title, content, isPublished } = e.target.elements;

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
        const data = await res.json();
        console.log(data);

        if (res.status === 200) {
            navigate('/');
        } else {
            setErrors((prevErrors) => [...prevErrors, data.message]);
            if (data.errors) {
                const errorMessages = data.errors.map((error) => error.msg);
                setErrors((prevErrors) => [...prevErrors, ...errorMessages]);
            }
        }
    }

    return (
        <form className="form create-post" onSubmit={handlePostFormSubmission}>
            <div className="create-post-info">
                <h2>Create a Post</h2>

                <div className="is-published">
                    <input
                        type="checkbox"
                        id="isPublished"
                        name="isPublished"
                    />
                    <label htmlFor="isPublished">Publish Post?</label>
                </div>
            </div>

            <label htmlFor="title">Post Title:</label>
            <input type="text" id="title" name="title" />

            <label htmlFor="content">Post Content:</label>
            <textarea id="content" name="content" />

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

export default CreatePost;
