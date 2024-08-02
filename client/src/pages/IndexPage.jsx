import React, { useEffect, useState } from 'react';
import Post from '../Post';
import './IndexPage.css'; // Make sure to import the CSS file for styling

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cookiealive,setcookiealive]=useState(false);
  useEffect(() => {
    const valid=fetch('http://localhost:4000/profile', {
      credentials: 'include',   
    })
      .then(response => response.json())
      .then(userInfo => {
        setUserInfo(userInfo);
        if (userInfo) {
          console.log(69);
          fetch('http://localhost:4000/post')
            .then(response => response.json())
            .then(posts => setPosts(posts))
            .catch(error => console.error('Error fetching posts:', error))
            .finally(() => setLoading(false));
            
        } else {
          
          setLoading(false);
        }
        setcookiealive(true);
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
        setLoading(false);
      });
      console.log(cookiealive);
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
          <p>Please sign in to see the posts.</p>
        )
      ) : (
        <p>Please sign in to see the posts.</p>
      )}
    </div>
  );
}
