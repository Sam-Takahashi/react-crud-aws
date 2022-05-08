import BlogList from "./components/BlogList";
import useFetch from "./myHooks/useFetch";

const Home = () => {

    const { data: blogs, isLoading, error } = useFetch('http://reactcrud-env.eba-82c44ptj.ap-northeast-1.elasticbeanstalk.com//blogs');

    return (
        <div className="home">
            {/* blogData={blogs} is a PROP */}
            {/* Conditional template{blogs && <code>}: if value on left(blogs) is false, ignore code on right and return. Used here beacuse initial blogData value is null(still being fetched)*/}
            {isLoading && <div>Loading...</div>}
            {error && <div>{error} Please try again later.</div>}
            {blogs && <BlogList
                blogData={blogs}
                title="All Blogs"
            />}
        </div>
    );
}

export default Home;