import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import SignUp from './components/SignUp';
import UsersPosts from './components/UsersPosts';
import Welcome from './components/Welcome';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PostForm from './components/PostForm';

function App() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchCurrentUser().then((data) => {
            if (data) {
                setUser(data.user);
                setIsLoading(false);
            }
        });

        async function fetchCurrentUser() {
            const res = await fetch(
                'http://localhost:3001/users/current-user',
                {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        Authorization:
                            'Bearer ' + localStorage.getItem('token'),
                    },
                }
            );
            if (res.status === 401) {
                setIsLoading(false);
                return;
            }
            const data = await res.json();
            return data;
        }
    }, []);

    const indexElement = (() => {
        if (isLoading) {
            return <main className="loading">Loading...</main>;
        }

        if (user === null) {
            return <Welcome />;
        } else {
            return <UsersPosts user={user} />;
        }
    })();

    return (
        <Router>
            <Header user={user} setUser={setUser} />
            <main>
                <Routes>
                    <Route exact path="/" element={indexElement} />
                    <Route
                        exact
                        path="/login"
                        element={<Login setUser={setUser} />}
                    />
                    <Route exact path="/signup" element={<SignUp />} />
                    <Route exact path="/create-post" element={<PostForm />} />
                    <Route
                        path="/edit-post/:postId"
                        element={<PostForm isEditing={true} />}
                    />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
