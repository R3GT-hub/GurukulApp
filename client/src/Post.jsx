import { format } from "date-fns";
import { Link } from "react-router-dom";
import "./Post.css";

export default function Post({ _id, title, summary, content, cover, createdAt, author, cloudpath }) {
    return (
        <Link to={`/post/${_id}`} className="post-link">
            <div className="post">
                <div className="post-image">
                    <img src={cloudpath} alt={title} className="post-img" />
                </div>
                <div className="post-details">
                    <h2 className="post-title">{title}</h2>
                    <p className="post-info">
                        <span className="post-author">{author?.username}</span>
                        <time className="post-time">{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
                    </p>
                    <p className="post-summary">{summary}</p>
                    <button className="delete-button">Delete</button>
                </div>
            </div>
        </Link>
    );
}
