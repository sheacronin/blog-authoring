import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function SignUp() {
    let navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    async function handleSignUpFormSubmission(e) {
        e.preventDefault();
        setErrors([]);

        const { username, displayName, password, confirmPassword } =
            e.target.elements;

        const res = await fetch('http://localhost:3001/users/', {
            method: 'POST',
            body: JSON.stringify({
                username: username.value,
                displayName: displayName.value,
                password: password.value,
                confirmPassword: confirmPassword.value,
            }),
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        console.log(data);

        if (res.status === 200) {
            navigate('/login');
        } else {
            setErrors((prevErrors) => [...prevErrors, data.message]);
            if (data.errors) {
                const errorMessages = data.errors.errors.map(
                    (error) => error.msg
                );
                setErrors((prevErrors) => [...prevErrors, ...errorMessages]);
            }
        }
    }

    return (
        <form className="login-form" onSubmit={handleSignUpFormSubmission}>
            <h2>Sign Up</h2>

            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />

            <label htmlFor="displayName">Display Name:</label>
            <input type="text" id="displayName" name="displayName" />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />

            <label htmlFor="password">Confirm Password:</label>
            <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
            />

            <button type="submit">Sign Up</button>
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

export default SignUp;
