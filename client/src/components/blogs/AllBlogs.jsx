import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBlogs } from "../../features/blog/userBlogSlice";
import BlogsList from "./BlogList";

export default function AllBlogs() {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blog);

  console.log(blogs);

  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  return (
    <>
      <h1 className="w-5/6 mx-auto text-center text-xl md:text-2xl font-inter my-10">
        Explore our latest articles, guides, and insights on a variety of topics
        to stay informed and inspired
      </h1>

      <BlogsList blogs_data={blogs} loadingState={loading} errors={error} />
    </>
  );
}
