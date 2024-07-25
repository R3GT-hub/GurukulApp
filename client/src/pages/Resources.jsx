import React, { useEffect, useState } from 'react';
import Resource from '../Resource';
import './IndexPage.css'; // Make sure to import the CSS file for styling

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(userInfo => {
        setUserInfo(userInfo);
        if (userInfo) {
          fetch('http://localhost:4000/resources')
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
          <p>Fetching Resources...</p>
        </div>
      ) : userInfo ? (
        posts.length > 0 ? (
          posts.map(post => (
            <Resource {...post} key={post._id} />
          ))
        ) : null
      ) : (
        <p>Please sign in to see the posts.</p>
      )}
    </div>
  );
}
