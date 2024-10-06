import { useDispatch, useSelector } from "react-redux";
import BlogsList from "./BlogList";
import { useEffect } from "react";
import { fetchUserCreatedBlogs } from "../../features/blog/userBlogSlice";

export default function MyBlogs() {
  const dispatch = useDispatch();
  //fetching user id
  const { _id } = useSelector((state) => state.user.users || {});
  console.log(_id && _id);
  //fetching those created blogs from redux state
  const { blogs, myBlogs } = useSelector((state) => state.blog || {});
  console.log(myBlogs && myBlogs);

  // console.log(blogs);
  useEffect(() => {
    if (_id) dispatch(fetchUserCreatedBlogs(_id));
    console.log(myBlogs);
  }, [dispatch, _id]);

  return (
    <>
      <h1 className="text-gray-500 capitalize font-bold text-3xl sm:text-4xl text-center my-8">
        my blogs
      </h1>
      <BlogsList blogs_data={myBlogs} />
    </>
  );
}
