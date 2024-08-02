import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './PostPage.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa'; // Importing icons

export default function PostPage() {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`https://gurukul-server.onrender.com/post/${id}`)
      .then(response => response.json())
      .then(postInfo => setPostInfo(postInfo))
      .catch(error => console.error('Error fetching post:', error));
  }, [id]);

  if (!postInfo) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className='post-page'>
      <div className='image'>
        <img src={postInfo.cloudpath} alt="" />
      </div>

      <div className='post-content'>
        <h1 className='post-title'>{postInfo.title}</h1>
        <Link to={postInfo.website} className='visit-website'>Visit Website</Link>
        <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
      </div>
      <div className='post-footer'>
        <span className='post-author-footer'><span style={{fontSize:"15px"}}>Posted By: </span>{postInfo.author?.username}</span>
        <div className='social-icons'>
          <a href={`https://github.com/R3GT-hub`} target="_blank" rel="noopener noreferrer" className='social-icon'>
            <FaGithub />
          </a>
          <a href={`https://www.linkedin.com/in/saransh-sharma-697857240/`} target="_blank" rel="noopener noreferrer" className='social-icon'>
            <FaLinkedin />
          </a>
        </div>
      </div>
      <Link to="/opportunities" className="back-link">Back to Home</Link>

      
    </div>
  );
}
