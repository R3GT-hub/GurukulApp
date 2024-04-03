import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function PostPage() {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then(response => response.json())
      .then(postInfo => setPostInfo(postInfo))
      .catch(error => console.error('Error fetching post:', error));
  }, [id]);

  if (!postInfo) return 'Job expired';

  return (
    <div className='post-page'>
      <div className='image'>
        <img src={postInfo.cloudpath} alt="" />
      </div>

      <div className='post-content'>
        <h1 className='post-title'>{postInfo.title}</h1>
        <Link to={postInfo.website}>Visit Website</Link>
        <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />

      </div>

      <Link to="/" className="back-link">Back to Home</Link>
    </div>
  );
}
