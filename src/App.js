import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <Router>
            <Header user={user} setUser={setUser} />
            <main>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            isLoading ? (
                                <div>Loading...</div>
                            ) : (
                                <div>hello world</div>
                            )
                        }
                    />
                    <Route
                        exact
                        path="/login"
                        element={<Login setUser={setUser} />}
                    />
                    <Route exact path="/signup" element={<SignUp />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
