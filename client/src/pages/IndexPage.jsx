import React, { useEffect, useState } from 'react';
import Post from '../Post';
import './IndexPage.css'; // Make sure to import the CSS file for styling

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',   
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Not authenticated');
        }
        return response.json();
      })
      .then(userInfo => {
        setUserInfo(userInfo);
        if (userInfo) {
          fetch('http://localhost:4000/post')
            .then(response => response.json())
            .then(posts => setPosts(posts))
            .catch(error => console.error('Error fetching posts:', error))
            .finally(() => setLoading(false));
        } else {
          setLoading(false);
        }
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='index-page'>
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Fetching Opportunities...</p>
        </div>
      ) : userInfo ? (
        posts.length > 0 ? (
          posts.map(post => (
            <Post {...post} key={post._id} isAdmin={userInfo.isAdmin} />
          ))
        ) : (
          <p>No posts available.</p>
        )
      ) : (
        <p>Please sign in to see the posts.</p>
      )}
    </div>
  );
}
