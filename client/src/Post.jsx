import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({_id, title, summary, content, cover, createdAt, author, cloudpath}) {
    return (
        <div className="post">
            <div className='image'>
                <Link to={`/post/${_id}`}>
                    <img src={cloudpath} alt="" />
                </Link>
            </div>
            <div className='texts'>
                <h2><Link to={`/post/${_id}`}>{title}</Link></h2>
                <p className="info">
                    <a href="/" className="author">{author?.username}</a>
                    <time className="time">{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
                </p>
                <p className='summary'>{summary}</p>
            </div>
        </div>
    )
}
