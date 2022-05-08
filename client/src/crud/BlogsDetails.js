import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../myHooks/useFetch";

const BlogDetails = () => {
    const { theId } = useParams();
    const { data: blogData, error, isLoading } = useFetch('http://127.0.0.1:3030/blog/' + theId);
    const history = useNavigate();

    const handleClick = () => {
        fetch('http://127.0.0.1:3030/delete-blog/' + blogData.id, {
            method: 'DELETE'
        }).then(() => {
            history('/');
            console.log('blog deleted')
        })

    }

    return (
        <div className="blog-details">
            {isLoading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blogData && (
                <article>
                    <h2>{blogData.title}</h2>
                    <p>Written by {blogData.author}</p>
                    <div>{blogData.body}</div>
                    <button onClick={handleClick}>Delete</button>

                    <Link to={`/update/${theId}`}>
                        <button className="update">Update</button>
                    </Link>
                </article>
            )}
        </div>
    );
}

export default BlogDetails;