import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import getDate from "../../utils/getDate";
import styles from "../../style.js";
import Card from "../../layout/Card.jsx";
import Button from "../Button.jsx";
import { RWebShare } from "react-web-share";
import { useDispatch, useSelector } from "react-redux";
import { followUser, saveBlog } from "../../features/users/userSlice.js";

export default function BlogsList({ blogs_data, loadingState, errors }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //array of users who are followed by current user
  const followingUsers = useSelector(
    (state) => state.user.users && state.user.users.following
  );
  // console.log("Current user is following ", followingUsers);

  //current user _id
  const { uuid } = useSelector((state) => state.user.users || {});
  // console.log("Current user's uuid ", uuid);

  //save blog
  const handleSaveBlog = (blogId) => {
    if (uuid) {
      dispatch(saveBlog({ blogId, userId: uuid }));
    } else {
      navigate("/user-login");
    }
  };

  //follow user
  const handleFollow = (following_id) => {
    if (uuid) {
      dispatch(followUser({ follower_id: uuid, following_id }));
    } else {
      navigate("/user-login");
    }
  };

  if (loadingState) return <div>Loading...</div>;
  if (errors) return <div>Error : {errors}</div>;

  return (
    <div
      className={`w-[80vw] sm:w-[90vw] ${styles.marginX} ${styles.paddingY}`}
    >
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 lg:gap-x-0">
        {!loadingState
          ? blogs_data.map((blog, index) => (
              <Card
                img={blog.image}
                key={index}
                className="w-full p-0 rounded-[30px] bg-indigo-50 border-1 border-black font-inter"
              >
                <div className="blog-header flex items-center px-8">
                  {blog.tags?.map((b, i) => (
                    <Button
                      key={i}
                      small
                      title={b}
                      btnColor=""
                      className="mr-2"
                    />
                  ))}
                  <div className="flex-1 flex text-zinc-500 justify-end gap-x-4">
                    <RWebShare
                      data={{
                        text: "Main Blog",
                        url: "http://localhost:5173/mainBlog",
                        title: "Main Blog",
                      }}
                      onClick={() => console.log("shared successfully!")}
                    >
                      <i className="fa-solid fa-share cursor-pointer"></i>
                    </RWebShare>
                    <i
                      className="fa-regular fa-bookmark cursor-pointer"
                      onClick={() => handleSaveBlog(blog.uuid)}
                    ></i>
                  </div>
                </div>
                <Link to={`/blog/${blog.slug}`}>
                  <div className="blog-mid px-8">
                    <h3 className="text-lg w-5/6 font-inter font-semibold">
                      {blog.title}
                    </h3>
                    <div
                      className="text-blue-900"
                      dangerouslySetInnerHTML={{
                        __html: blog.content.substring(0, 150) + "...",
                      }}
                    />
                  </div>
                </Link>
                <div className="blog-footer flex justify-between px-8 py-4">
                  <div className="profile flex">
                    <img
                      src="https://i.pravatar.cc/150?img=2"
                      alt="Author"
                      className="author-avatar size-12 rounded-full mr-4 cursor-pointer"
                    />
                    <div>
                      <span className="author-name text-lg font-semibold">
                        {blog.createdBy.fullName}
                      </span>
                      <p className="post-date text-sm">
                        {getDate(blog.updatedAt)}
                      </p>
                    </div>
                  </div>
                  {/* follow button */}
                  {blog.createdBy.uuid !== uuid && (
                    <div className="blog-actions flex justify-center">
                      <button
                        className="follow-button transition-all duration-300 ease-in-out"
                        onClick={() => handleFollow(blog.createdBy.uuid)}
                      >
                        <span className="font-bold">
                          {followingUsers?.length > 0
                            ? followingUsers.filter(
                                (fu) => fu.uuid === blog.createdBy.uuid
                              )
                              ? "Following"
                              : "+ FOLLOW"
                            : "+FOLLOW"}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </Card>
            ))
          : [1, 2, 3].map((index) => <TopicLoadingCard key={index} />)}
      </div>
    </div>
  );
}
