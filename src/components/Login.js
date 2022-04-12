import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login({ setUser }) {
    let navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    async function handleLoginFormSubmission(e) {
        e.preventDefault();
        setErrors([]);

        const { username, password } = e.target.elements;

        const res = await fetch('http://localhost:3001/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username: username.value,
                password: password.value,
            }),
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();

        if (res.status === 200) {
            setUser(data.user);
            localStorage.setItem('token', data.token);
            navigate('/');
        } else {
            setErrors((prevErrors) => [...prevErrors, data.info.message]);
        }
    }

    return (
        <form className="login-form" onSubmit={handleLoginFormSubmission}>
            <h2>Login</h2>

            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />

            <button type="submit">Login</button>
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

export default Login;
