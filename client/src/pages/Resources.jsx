import React, { useEffect, useState } from 'react';
import Resource from '../Resource';

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

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
            .catch(error => console.error('Error fetching posts:', error));
        }
      })
      .catch(error => console.error('Error fetching user info:', error));
  }, []);

  return (
    <div className='index-page'>
      {userInfo ? (
        posts.length > 0 ? (
          posts.map(post => (
            <Resource {...post} key={post._id} />
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
