import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import Post from './Post';

function PostWithComments() {
    let params = useParams();
    const { postId } = params;
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchPost().then((data) => {
            setPost(data);
            setIsLoading(false);
        });

        async function fetchPost() {
            const res = await fetch(
                `https://blog-api-sc.herokuapp.com/posts/${postId}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization:
                            'Bearer ' + localStorage.getItem('token'),
                    },
                }
            );
            const data = await res.json();
            return data;
        }
    }, [postId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Post post={post} isSinglePost={true} setPost={setPost} />
            <section className="comments">
                <h3>Comments</h3>
                {post.comments.map((comment) => (
                    <Comment
                        key={comment._id}
                        comment={comment}
                        postId={post._id}
                        setPost={setPost}
                    />
                ))}
                {post.comments.length === 0 && (
                    <p>There are no comments on this post</p>
                )}
            </section>
        </>
    );
}

export default PostWithComments;
