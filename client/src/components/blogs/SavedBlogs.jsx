import { useDispatch, useSelector } from "react-redux";
import BlogsList from "./BlogList";
import { fetchUserSavedBlogs } from "../../features/blog/userBlogSlice";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SavedBlogs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [savedBlogsAvailable, setSavedBlogsAvailable] = useState(false);

  //fetching saved blogs from user
  const savedBlogsId = useSelector(
    (state) => state.user.users?.savedBlogs || []
  );
  console.log(savedBlogsId && savedBlogsId);

  //fetching those saved blogs from redux state
  const { savedBlogs } = useSelector((state) => state.blog || {});
  console.log(savedBlogs && savedBlogs);

  useEffect(() => {
    if (savedBlogsId.length > 0) {
      setSavedBlogsAvailable(!savedBlogsAvailable);
      dispatch(fetchUserSavedBlogs(savedBlogsId));
    }
  }, [dispatch, savedBlogsId]);

  return (
    <>
      <h1 className="text-gray-500 capitalize font-bold text-3xl sm:text-4xl text-center my-8">
        saved blogs
      </h1>
      {savedBlogsAvailable ? (
        <BlogsList blogs_data={savedBlogs} />
      ) : (
        <div className="text-lg text-center col-span-1 sm:col-span-2 lg:col-span-3">
          No Blogs Saved...{" "}
          {
            <Link to="../" className="text-btnColor">
              All Blogs{" "}
            </Link>
          }
        </div>
      )}
    </>
  );
}
