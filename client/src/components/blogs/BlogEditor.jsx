import React, { useRef, useState } from "react";
import styles from "./BlogEditor.module.css";
import "./_blogEditor.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import half_circle from "../../assets/vectors/half_circle.png";
import smFooterVector from "../../assets/vectors/smFooterVector.png";
import left_texture from "../../assets/vectors/login_texture2.png";
import axios from "axios";
import { useSelector } from "react-redux";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ size: [] }],
    ["bold", "italic", "underline"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

const BlogEditor = () => {
  const { _id } = useSelector((store) => store.user.users);

  const fileInputRef = useRef(null);
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [showNotification, setShowNotification] = useState(false);

  const handleContentChange = (value) => {
    setBlog({ ...blog, content: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //FormData
    const formData = new FormData();
    formData.append("creatorId", _id);
    formData.append("title", blog.title);
    formData.append("content", blog.content);

    if (blog.image) {
      formData.append("image", blog.image);
    }
    const res = axios
      .post("/api/v1/user/create-blog", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
      });

    console.log(res);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setBlog({
      title: "",
      content: "",
      image: "",
    });
  };

  return (
    <div className="relative">
      <img
        src={half_circle}
        alt="half_circle_right"
        className="absolute top-0 right-0 w-[20rem]"
      />
      <img
        src={left_texture}
        alt="texture_left"
        className="absolute top-20 w-[30rem]"
      />
      <div className={styles.content_container}>
        <div className={styles.form_container}>
          <h1
            className={`${styles.title} text-center text-3xl font-semibold font-inria mb-8`}
          >
            Write Your Blog Here ...
          </h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.input_group}>
              <label
                htmlFor="image"
                className={`${styles.input_label} font-bold text-xl font-inria`}
              >
                Upload Thumbnail :
              </label>
              <input
                type="file"
                accept="image/*"
                id="image"
                ref={fileInputRef}
                onChange={(e) => setBlog({ ...blog, image: e.target.files[0] })}
                className={styles.input_field}
              />
            </div>
            <div className={styles.input_group}>
              <label
                htmlFor="title"
                className={`${styles.input_label} font-bold text-xl font-inria`}
              >
                Title :
              </label>
              <input
                type="text"
                id="title"
                value={blog.title}
                onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                placeholder="Title"
                className={styles.input_field}
              />
            </div>
            <div className={styles.input_group}>
              <label
                htmlFor="content"
                className={`${styles.input_label} font-bold text-xl font-inria`}
              >
                Write the content over here
              </label>
              <div className={styles.editor_container}>
                <ReactQuill
                  id="content"
                  value={blog.content}
                  onChange={handleContentChange}
                  placeholder="Write the content over here"
                  theme="snow"
                  modules={modules}
                  formats={formats}
                  className={styles.editor}
                />
              </div>
            </div>
            <button type="submit" className={styles.submit_button}>
              Submit
            </button>
          </form>
          {showNotification && (
            <div className={styles.notification}>
              Blog submitted successfully!
            </div>
          )}
        </div>
      </div>
      <img
        src={smFooterVector}
        alt="footer"
        className="absolute bottom-0 w-full h-[10rem] sm:h-[14rem] md:h-[20rem]"
      />
    </div>
  );
};

export default BlogEditor;
