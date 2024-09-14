import { RWebShare } from "react-web-share";
import { Button, TopicLoadingCard } from "../index";
import Card from "../../layout/Card";
import styles from "../../style";
import { useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import { Link } from "react-router-dom";

export function BlogsList({ blogs_data, loadingState }) {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div
      className={`w-[80vw] sm:w-[90vw] ${styles.marginX} ${styles.paddingY}`}
    >
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 lg:gap-x-0">
        {!loadingState
          ? blogs_data.map((blog) => (
              <Card
                img={blog.image_Link}
                key={blog.id}
                className="p-0 rounded-[30px] bg-indigo-50 border-1 border-black font-inter"
              >
                <div className="blog-header flex items-center px-8">
                  <Button small title={blog.category} btnColor=""></Button>
                  <div className="flex-1 flex text-zinc-500 justify-end gap-x-4">
                    <RWebShare
                      data={{
                        text: "Main Blog",
                        url: "http://localhost:5173/mainBlog",
                        title: "Main Blog",
                      }}
                      onClick={() => console.log("shared successfully!")}
                    >
                      <i className="fa-solid fa-share"></i>
                    </RWebShare>
                    <i className="fa-regular fa-bookmark"></i>
                  </div>
                </div>
                <Link to={blog.heading.toLowerCase()}>
                  <div className="blog-mid px-8">
                    <h3 className="text-lg w-5/6 font-inter font-semibold">
                      {blog.heading}
                    </h3>
                    <p className="text-blue-900">
                      {blog.details.substring(0, 150)}...
                    </p>
                  </div>
                </Link>
                <div className="blog-footer flex justify-between px-8 py-4">
                  <div className="profile flex">
                    <img
                      src="https://i.pravatar.cc/150?img=2"
                      alt="Author"
                      className="author-avatar size-12 rounded-full mr-4"
                    />
                    <div>
                      <span className="author-name text-lg font-semibold">
                        {blog.author}
                      </span>
                      <p className="post-date text-sm">Yesterday</p>
                    </div>
                  </div>
                  <div className="blog-actions flex justify-center">
                    <button className="follow-button transition-all duration-300 ease-in-out">
                      <span className="font-bold">
                        {isFollowing ? "Following" : "+ FOLLOW"}
                      </span>
                    </button>
                  </div>
                </div>
              </Card>
            ))
          : [1, 2, 3].map((index) => <TopicLoadingCard key={index} />)}
      </div>
    </div>
  );
}

export default function AllBlogs() {
  const [blogs, isLoading] = useFetchData("/src/data/blogs.json");

  return (
    <>
      <h1 className="w-5/6 mx-auto text-center text-xl md:text-2xl font-inter my-10">
        Explore our latest articles, guides, and insights on a variety of topics
        to stay informed and inspired
      </h1>

      <BlogsList blogs_data={blogs} loadingState={isLoading} />
    </>
  );
}
