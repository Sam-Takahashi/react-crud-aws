import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import BlogDropdown from '../components/Dropdown';
// import useFetch from '../myHooks/useFetch';


const Update = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useNavigate();
    const { theId } = useParams();
    // const { data: blogs } = useFetch('http://127.0.0.1:3030/blogs');


    // fetch single (blog) endpoint
    useEffect(() => {
        fetch('http://reactcrud-env.eba-82c44ptj.ap-northeast-1.elasticbeanstalk.com//blog/' + theId)
            .then(res => {
                return res.json()
            }).then((data) => { // data = db.json
                setTitle(data.title);
                setBody(data.body);
                setAuthor(data.author);
            })
    }, [theId])

    const handleSubmit = (e) => {
        e.preventDefault();
        // store form values in blog object
        const blog = {
            title,
            body,
            author
        }

        setIsPending(true);

        //* SUBMIT UPDATE BTN
        // fetch update endpoint 
        fetch('http://reactcrud-env.eba-82c44ptj.ap-northeast-1.elasticbeanstalk.com//update-blog/' + theId, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog) // convert blog object to json
        }).then(() => {
            console.log('updated Blog!');
            setIsPending(false);
            history('/'); // Once data to added redirect to root(home page)
        })
    }

    // ==========================================================================

    return (
        <div className="create">
            <h2>Update Blog</h2>
            {title && <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    name="name"
                />
                <label>Blog body:</label>
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    name="body"
                ></textarea>
                <label>Blog author:</label>

                {/* {blogs && <BlogDropdown blogData={blogs} />} */}
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="Sam">Sam</option>
                    <option value="Terauchi">Terauchi</option>
                    <option value="Hassan">Hassan</option>
                </select>

                {!isPending && <button>Update Blog</button>}
                {isPending && <button disabled>Updating blog...</button>}
            </form>}
        </div>
    );
}

export default Update;
