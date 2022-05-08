import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import BlogDropdown from '../components/Dropdown';
// import useFetch from '../myHooks/useFetch';


const Create = () => {
    //* create State to save form data(two way binding)
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [isPending, setIsPending] = useState(false);
    // const { data: blogs } = useFetch('http://127.0.0.1:3030/blogs');

    // useNavigate(browsers forwad/back btns, redirect the user)
    const history = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // store form values in blog object
        const blog = {
            title,
            body,
            author
        }

        setIsPending(true);

        //* send form data to endpoint(db) [async method]
        fetch('http://reactcrud-env.eba-82c44ptj.ap-northeast-1.elasticbeanstalk.com//create-blog', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(blog) // convert blog object to json
        }).then(() => {
            console.log('New blog added!');
            setIsPending(false);
            history('/'); // Once data to added redirect to root(home page)
        })

    }

    // ==========================================================================

    return (
        <div className="create">
            <h2>Add a new Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input
                    type="text"
                    reqiured="true"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} // updates hook with new value(input value)
                />
                <label>Blog body:</label>
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    reqiured="true"
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

                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding blog...</button>}

                <section>
                    <label>Preview:</label>
                    <hr />
                    <p>{title}</p>
                    <p>{body}</p>
                    <p>{author}</p>
                </section>
            </form>
        </div>
    );
}

export default Create;
