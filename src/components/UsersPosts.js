import { useEffect, useState } from 'react';
import Post from './Post';

function UsersPosts({ user }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchCurrentUsersPosts().then((postsData) => setPosts(postsData));

        async function fetchCurrentUsersPosts() {
            const response = await fetch(
                `http://localhost:3001/users/${user.id}/posts`
            );
            const data = await response.json();
            return data;
        }
    }, [user]);

    return (
        <div>
            {user && <div className="greeting">Hello, {user.displayName}!</div>}
            {posts.map((post) => (
                <Post key={post._id} post={post} setPosts={setPosts} />
            ))}
        </div>
    );
}

export default UsersPosts;
