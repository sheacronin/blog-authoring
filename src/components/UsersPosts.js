import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../constants';
import Post from './Post';

function UsersPosts({ user }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchCurrentUsersPosts().then((postsData) => setPosts(postsData));

        async function fetchCurrentUsersPosts() {
            const response = await fetch(
                `${API_BASE_URL}/users/${user.id}/posts`,
                {
                    method: 'GET',
                    headers: {
                        Authorization:
                            'Bearer ' + localStorage.getItem('token'),
                    },
                }
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
