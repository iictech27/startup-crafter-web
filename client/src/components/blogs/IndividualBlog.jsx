import React, { useState, useEffect } from "react";
import { RWebShare } from "react-web-share";
import smFooterVector from "../../assets/vectors/smFooterVector.png";
import blogImage from "../../assets/images/blogImage.png";
import styles from "./IndividualBlog.module.css";
import BlogComments from "./BlogComments";

const formatNumber = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toString();
};

export default function IndividualBlog() {
  const [likeCount, setLikeCount] = useState(1200);
  const [commentCount, setCommentCount] = useState(50);
  const [viewCount, setViewCount] = useState(5000);

  useEffect(() => {
    setViewCount(viewCount + 1);
  }, []);

  const handleLike = () => {
    setLikeCount(likeCount + 1);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto bg-white rounded-lg overflow-hidden">
        <div className="p-5">
          <div className="blog-heading flex flex-wrap justify-between">
            <div className="header mb-3">
              <h1 className="text-3xl md:text-4xl font-imprima font-semibold text-gray-900 tracking-wider">
                TECHNOLOGY TRENDS IN 2024
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
                <i className="fa-solid fa-share"></i>
              </RWebShare>
              <i className="fa-regular fa-bookmark"></i>
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
                  Rahul Saxena
                  <i className="fa-solid fa-user-check text-lg ml-3 text-zinc-500"></i>
                </span>
                <p className="post-date text-gray-500 text-sm">Yesterday</p>
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
          <div className="text-lg">
            <p className="mt-4 text-gray-700 text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
              quaerat consequuntur molestias eius ut nobis autem accusamus quo
              non nihil impedit, excepturi dolor omnis rem tenetur nulla ullam
              placeat voluptate? Aperiam tempora aut nostrum numquam nesciunt,
              voluptate error. Odit in, eius voluptatibus dicta totam fugit
              quibusdam veritatis possimus aperiam accusamus veniam delectus
              consequatur numquam eaque blanditiis, provident tempore nobis
              rerum.
            </p>
            <p className="mt-4 text-gray-700 text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
              quaerat consequuntur molestias eius ut nobis autem accusamus quo
              non nihil impedit, excepturi dolor omnis rem tenetur nulla ullam
              placeat voluptate? Aperiam tempora aut nostrum numquam nesciunt,
              voluptate error. Odit in, eius voluptatibus dicta totam fugit
              quibusdam veritatis possimus aperiam accusamus veniam delectus
              consequatur numquam eaque blanditiis, provident tempore nobis
              rerum.
            </p>
            <a
              href="https://www.simplilearn.com/top-technology-trends-and-jobs-article"
              className="block mt-4 text-blue-500 hover:underline"
            >
              https://www.simplilearn.com/top-technology-trends-and-jobs-article
            </a>
            <p className="mt-4 text-gray-700 text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
              quaerat consequuntur molestias eius ut nobis autem accusamus quo
              non nihil impedit, excepturi dolor omnis rem tenetur nulla ullam
              placeat voluptate? Aperiam tempora aut nostrum numquam nesciunt,
              voluptate error. Odit in, eius voluptatibus dicta totam fugit
              quibusdam veritatis possimus aperiam accusamus veniam delectus
              consequatur numquam eaque blanditiis, provident tempore nobis
              rerum.
            </p>
            <p className="mt-4 text-gray-700 text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
              quaerat consequuntur molestias eius ut nobis autem accusamus quo
              non nihil impedit, excepturi dolor omnis rem tenetur nulla ullam
              placeat voluptate? Aperiam tempora aut nostrum numquam nesciunt,
              voluptate error. Odit in, eius voluptatibus dicta totam fugit
              quibusdam veritatis possimus aperiam accusamus veniam delectus
              consequatur numquam eaque blanditiis, provident tempore nobis
              rerum.
            </p>
          </div>
        </div>
        <BlogComments />
      </div>
      <img
        src={smFooterVector}
        alt="footer"
        className="relative bottom-0 w-full h-[10rem] sm:h-[8rem] md:h-[14rem]"
      />
    </>
  );
}
