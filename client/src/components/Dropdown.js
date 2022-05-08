import { useState } from "react";

// Home.js -> blogData={blogs} is the props
const BlogDropdown = ({ blogData }) => { // destructuring props

    const [author, setAuthor] = useState('');


    return (
        <div className="blog-list">
            <select
                value={author}
                onChange={(e) => setAuthor(e.target.value)}>
                {blogData.map(({ id, author }, index) => <option key={id} value={id} >{author}</option>)}
            </select>
        </div>
    );
}

export default BlogDropdown;