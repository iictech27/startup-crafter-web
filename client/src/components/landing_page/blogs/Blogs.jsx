import { blogs } from "../../../constants/index";
import Card from "../../../layout/Card";

export default function Blogs() {
  return (
    <>
      {blogs.map((blog, index) => (
        <Card key={index} img={blog.imgLink}>
          <p>{blog.date}</p>
          <h3 className="text-lg w-5/6 font-inter font-semibold">
            {blog.title.substring(0, 50)}...
          </h3>
          <p className="text-blue-900">By : {blog.author}</p>
        </Card>
      ))}
    </>
  );
}
