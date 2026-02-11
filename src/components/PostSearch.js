import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const PostSearch = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [post, setPost] = useState(null);
    const [postComments, setPostComments] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const postId = searchParams.get('postId') || "";

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchParams(value ? { postId: value } : {});
    };
 
    
    const fetchPostAndComments = async () => {
        try {
            const postResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            setPost(postResponse.data);

            const commentsResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
            setPostComments(commentsResponse.data);
            setErrorMessage("");
        } catch (error) {
            console.error('Error fetching post or comments:', error);
            setPost(null);
            setPostComments([]);
            setErrorMessage("Nie znaleziono wpisu");
        }
    };

    useEffect(() => {
        // fetch when id changes
        if (!postId) {
            setPost(null);
            setPostComments([]);
            setErrorMessage("");
            return;
        }
        fetchPostAndComments();
    }, [postId]); //on id change

    return (
        <div>
            <h2>Wyszukiwarka Postów</h2>
            <input
                type="text"
                value={postId}
                onChange={handleInputChange}
                placeholder="Wpisz ID posta"
            />

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            {post && (
                <div>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>

                    <h4>Komentarze:</h4>
                    <ul>
                        {postComments.map((comment) => (
                            <li key={comment.id}>
                                <strong>{comment.name}</strong>: {comment.body}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PostSearch;

