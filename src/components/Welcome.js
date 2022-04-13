import { Link } from 'react-router-dom';
import '../styles/Welcome.css';

function Welcome() {
    return (
        <article className="welcome">
            <p>
                Welcome to Bloggit! Please <Link to="/login">login</Link> or{' '}
                <Link to="/signup">sign up</Link> for an account to start
                authoring blog posts.
            </p>
        </article>
    );
}

export default Welcome;
