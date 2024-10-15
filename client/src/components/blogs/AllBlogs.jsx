import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBlogs } from "../../features/blog/userBlogSlice";
import BlogsList from "./BlogList";
import { Link } from "react-router-dom";

export default function AllBlogs() {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blog);

  // console.log(blogs);
  const [blogsAvailable, setBlogsAvailable] = useState(false);

  useEffect(() => {
    if (blogs.length > 0) {
      dispatch(fetchAllBlogs());
      setBlogsAvailable(!blogsAvailable);
    }
  }, [dispatch]);

  return (
    <>
      <h1 className="w-5/6 mx-auto text-center text-xl md:text-2xl font-inter my-10">
        Explore our latest articles, guides, and insights on a variety of topics
        to stay informed and inspired
      </h1>
      {blogsAvailable ? (
        <BlogsList blogs_data={blogs} loadingState={loading} errors={error} />
      ) : (
        <div className="text-lg text-center col-span-1 sm:col-span-2 lg:col-span-3">
          No Blogs Available...{" "}
          {
            <Link to="editor" className="text-btnColor">
              Write One{" "}
              <i className="fa-regular fa-pen-to-square cursor-pointer"></i>
            </Link>
          }
        </div>
      )}
    </>
  );
}
