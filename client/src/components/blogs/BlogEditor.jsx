import React, { useRef, useState } from "react";
import styles from "./BlogEditor.module.css";
import "./_blogEditor.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import half_circle from "/assets/vectors/half_circle.png";
import smFooterVector from "/assets/vectors/smFooterVector.png";
import left_texture from "/assets/vectors/login_texture2.png";
import { useDispatch, useSelector } from "react-redux";
import SelectInput from "../internship_portal/SelectInput";
import { blog_tags_options } from "../../constants";
import { createBlog } from "../../features/blog/userBlogSlice";

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
  const { uuid } = useSelector((store) => store.user.users || {});
  const dispatch = useDispatch();

  const fileInputRef = useRef(null);
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    image: "",
    tags: [],
  });
  // const [selectedTagOptions,setSelectedTagOptions] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  const handleContentChange = (value) => {
    setBlog({ ...blog, content: value });
  };

  const handleTagOptions = (selected) => {
    const selectedValue = selected
      ? selected.map((option) => option.value)
      : [];
    setBlog((prevBlog) => ({ ...prevBlog, tags: selectedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //FormData
    const formData = new FormData();
    formData.append("creatorId", uuid);
    formData.append("title", blog.title);
    formData.append("content", blog.content);
    formData.append("tags", blog.tags);

    if (blog.image) {
      formData.append("image", blog.image);
    }

    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    dispatch(createBlog(formData));
    // console.log(res);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setBlog({
      title: "",
      content: "",
      image: "",
      tags: [],
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
            {/* upload thumbnail section */}
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
            {/* title section */}
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
            {/* main content */}
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
            {/* tags section */}
            <div className={styles.input_group}>
              <label
                htmlFor="content"
                className={`${styles.input_label} font-bold text-xl font-inria`}
              >
                Tags
              </label>
              <SelectInput
                title=""
                options={blog_tags_options}
                handleOptionValue={blog.tags?.map((tag) => ({
                  value: tag,
                  label: tag,
                }))}
                handleOptionChange={handleTagOptions}
                placeholder="e.g. Startup"
              />
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
