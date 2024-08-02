import React, { useEffect, useState } from 'react';
import Post from '../Post';
import 'animate.css';
import './IndexPage.css'; 

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('https://gurukul-server.onrender.com/profile', {
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
          fetch('https://gurukul-server.onrender.com/post')
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
        <div className="loading-container animate__animated animate__fadeIn">
          <div className="loading-spinner"></div>
          <p>Fetching Opportunities...</p>
        </div>
      ) : userInfo ? (
        posts.length > 0 ? (
          posts.map(post => (
            <div className="animate__animated animate__fadeInUp" key={post._id}>
              <Post {...post} isAdmin={userInfo.isAdmin} />
            </div>
          ))
        ) : (
          <p className="animate__animated animate__fadeIn">No posts available.</p>
        )
      ) : (
        <p className="animate__animated animate__fadeIn">Please sign in to see the posts.</p>
      )}
    </div>
  );
}
