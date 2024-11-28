import React, { useState, useEffect } from "react";
import { RWebShare } from "react-web-share";
import smFooterVector from "/assets/vectors/smFooterVector.png";
import blogImage from "/assets/images/blogImage.png";
import BlogComments from "./BlogComments";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchIndividualBlog } from "../../features/blog/userBlogSlice";
import getDate from "../../utils/getDate";
import { saveBlog } from "../../features/users/userSlice";

const formatNumber = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toString();
};

export default function IndividualBlog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogs } = useParams();
  const { blogDetails } = useSelector((state) => state.blog || {});

  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);

  const { _id } = useSelector((state) => state.user.users || {});

  const handleSaveBlog = (blogId) => {
    if (_id) {
      dispatch(saveBlog({ blogId, userId: _id }));
    } else {
      navigate("/user-login");
    }
  };

  useEffect(() => {
    if (blogs) {
      dispatch(fetchIndividualBlog(blogs));
      setViewCount(viewCount + 1);
      console.log(blogDetails);
    }
  }, [dispatch, blogs]);

  const handleLike = () => {
    setLikeCount(likeCount + 1);
  };

  return (
    <>
      {blogDetails ? (
        <div className="max-w-5xl mx-auto bg-white rounded-lg overflow-hidden">
          <div className="p-5">
            <div className="blog-heading flex flex-wrap justify-between">
              <div className="header mb-3">
                <h1 className="text-3xl md:text-4xl font-imprima font-semibold text-gray-900 tracking-wider">
                  {blogDetails?.title}
                </h1>
              </div>
              <div className="save-share flex-1 flex justify-end gap-x-6 items-center text-zinc-500">
                <RWebShare
                  data={{
                    text: "My Blog",
                    url: "http://localhost:5173/myBlog",
                    title: "My Blog",
                  }}
                  onClick={() => console.log("shared successfully!")}
                >
                  <i className="fa-solid fa-share cursor-pointer"></i>
                </RWebShare>
                <i
                  className="fa-regular fa-bookmark cursor-pointer"
                  onClick={() => handleSaveBlog(blogDetails._id)}
                ></i>
              </div>
            </div>
            <div className="flex flex-wrap-reverse sm:flex-wrap justify-between">
              <div className="profile flex">
                <img
                  src="https://i.pravatar.cc/150?img=2"
                  alt="Author"
                  className="author-avatar w-12 h-12 rounded-[15px]"
                />
                <div className="ml-3">
                  <span className="author-name flex text-xl text-blue-600">
                    {blogDetails?.createdBy?.fullName}
                    <i className="fa-solid fa-user-check text-lg ml-3 text-zinc-500"></i>
                  </span>
                  <p className="post-date text-gray-500 text-sm">
                    {getDate(blogDetails?.updatedAt)}
                  </p>
                </div>
              </div>
              <div className="flex justify-around gap-x-6 items-center mt-2 text-gray-600">
                <div className="flex items-center gap-x-1">
                  <button onClick={handleLike}>
                    <i className="fa-solid fa-thumbs-up"></i>
                  </button>
                  <span>{formatNumber(likeCount)}</span>
                </div>
                <div className="flex items-center gap-x-1">
                  <button onClick={() => setCommentCount(commentCount + 1)}>
                    <i className="fa-regular fa-comment"></i>
                  </button>
                  <span>{commentCount}</span>
                </div>
                <div className="flex items-center gap-x-1">
                  <button onClick={() => setViewCount(viewCount + 1)}>
                    <i className="fa-solid fa-eye"></i>
                  </button>
                  <span>{formatNumber(viewCount)}</span>
                </div>
              </div>
              <img
                src={blogImage}
                alt="Technology Trends"
                className="mt-4 w-full mb-4 sm:mb-0"
              />
            </div>
            <div
              className="text-lg"
              dangerouslySetInnerHTML={{ __html: blogDetails?.content }}
            />
          </div>
          <BlogComments />
        </div>
      ) : (
        <div className="min-h-[80vh] flex justify-center items-center">
          <p className="text-4xl">
            404 ! No Blog Found{" "}
            <Link
              to="/blog"
              className="mt-5 text-2xl block text-center text-btnColor"
            >
              All Blogs
            </Link>
          </p>
        </div>
      )}
      <img
        src={smFooterVector}
        alt="footer"
        className="relative bottom-0 w-full h-[10rem] sm:h-[8rem] md:h-[14rem]"
      />
    </>
  );
}
