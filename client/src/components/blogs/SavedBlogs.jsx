import { useDispatch, useSelector } from "react-redux";
import BlogsList from "./BlogList";
import { fetchUserSavedBlogs } from "../../features/blog/userBlogSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SavedBlogs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //fetching saved blogs from user
  const savedBlogsId = useSelector(
    (state) => state.user.users?.savedBlogs || []
  );
  console.log(savedBlogsId && savedBlogsId);

  //fetching those saved blogs from redux state
  const { blogs, savedBlogs } = useSelector((state) => state.blog || {});
  console.log(savedBlogs && savedBlogs);

  useEffect(() => {
    if (savedBlogsId.length > 0) {
      dispatch(fetchUserSavedBlogs(savedBlogsId));
    } else {
      navigate("/user-login");
    }
  }, [dispatch, savedBlogsId]);

  return (
    <>
      <h1 className="text-gray-500 capitalize font-bold text-3xl sm:text-4xl text-center my-8">
        saved blogs
      </h1>
      <BlogsList blogs_data={savedBlogs} />
    </>
  );
}
