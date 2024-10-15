import { useDispatch, useSelector } from "react-redux";
import BlogsList from "./BlogList";
import { useEffect, useState } from "react";
import { fetchUserCreatedBlogs } from "../../features/blog/userBlogSlice";
import { Link } from "react-router-dom";

export default function MyBlogs() {
  const dispatch = useDispatch();

  //fetching user uuid
  const { uuid } = useSelector((state) => state.user.users || {});
  // console.log(uuid && uuid);

  //fetching those created blogs from redux state
  const { myBlogs } = useSelector((state) => state.blog || {});
  // console.log(myBlogs && myBlogs);

  const [myBlogsAvailable, setMyBlogsAvailable] = useState(false);

  useEffect(() => {
    if (uuid) {
      dispatch(fetchUserCreatedBlogs(uuid));
    }
  }, [dispatch, uuid]);

  useEffect(() => {
    setMyBlogsAvailable(myBlogs.length > 0);
  }, [myBlogs]);

  return (
    <>
      <h1 className="text-gray-500 capitalize font-bold text-3xl sm:text-4xl text-center my-8">
        my blogs
      </h1>
      {myBlogsAvailable ? (
        <BlogsList blogs_data={myBlogs} />
      ) : (
        <div className="text-lg text-center col-span-1 sm:col-span-2 lg:col-span-3">
          No Blogs Available...{" "}
          {
            <Link to="../editor" className="text-btnColor">
              Write One{" "}
              <i className="fa-regular fa-pen-to-square cursor-pointer"></i>
            </Link>
          }
        </div>
      )}
    </>
  );
}
