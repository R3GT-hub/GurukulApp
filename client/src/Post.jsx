import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import "./Post.css";
import axios from "axios";

const handleDelete = async (id, navigate) => {
    try {
        const response = await axios.delete(`https://gurukul-server.onrender.com/post/${id}`, { withCredentials: true });
        if (response.status === 200) {
            window.location.reload();
        }
    } catch (error) {
        console.error("There was an error deleting the post!", error);
    }
};

export default function Post({ _id, title, summary, content, cover, createdAt, author, cloudpath, isAdmin }) {
    const navigate = useNavigate();
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
                    {isAdmin && (
                        <button className="delete-button" onClick={() => handleDelete(_id, navigate)}>Delete</button>
                    )}
                </div>
            </div>
        </Link>
    );
}
