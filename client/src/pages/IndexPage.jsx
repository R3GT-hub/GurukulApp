import React, { useEffect, useState } from 'react';
import Post from '../Post';

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/post')
      .then(response => response.json())
      .then(posts => setPosts(posts))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div className='index-page'>
      {posts.length > 0 &&
        posts.map(post => (
          <Post {...post} key={post._id} />
        ))}
    </div>
  );
}
