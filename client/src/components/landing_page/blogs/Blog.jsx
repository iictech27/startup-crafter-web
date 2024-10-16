import { useSelector } from "react-redux";
import styles from "../../../style";
import BlogsList from "../../blogs/BlogList";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Blog() {
  const { blogs, loading, error } = useSelector((state) => state.blog || {});

  // console.log(blogs);
  const [blogsAvailable, setBlogsAvailable] = useState(false);

  useEffect(() => {
    if (blogs.length > 0) {
      setBlogsAvailable(!blogsAvailable);
    }
  }, [blogs]);

  return (
    <section className={`mt-44 relative ${styles.sectionFooter}`}>
      <h1 className={`${styles.sectionHead2} font-inria`}>
        Our latest <span className="text-highlight">Blogs</span>
      </h1>
      <p
        className={`${styles.paddingX} ${styles.flexCenter} ${styles.sectionSubHead}`}
      >
        Stay tuned and updated by the recent updates from our blog
      </p>
      <section
        className={`${styles.section2} ${styles.marginX} ${styles.paddingY} justify-between items-center gap-x-8 gap-y-8`}
      >
        {blogsAvailable ? (
          <BlogsList
            blogs_data={blogs.filter((_, i) => i < 3 && _)}
            loadingState={loading}
            errors={error}
          />
        ) : (
          <div className="text-lg text-center col-span-1 sm:col-span-2 lg:col-span-3">
            No Blogs Available...{" "}
            {
              <Link to="editor" className="text-btnColor">
                Write One{" "}
                <i className="fa-regular fa-pen-to-square cursor-pointer"></i>
              </Link>
            }
          </div>
        )}
      </section>
    </section>
  );
}
