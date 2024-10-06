import useFetchData from "../../hooks/useFetchData";
import { BlogsList } from "./AllBlogs";

export default function SavedBlogs() {
  const { data, isLoading } = useFetchData("/src/data/savedblogs.json");

  return (
    <>
      <h1 className="text-gray-500 capitalize font-bold text-3xl sm:text-4xl text-center my-8">
        saved blogs
      </h1>
      <BlogsList blogs_data={data} loadingState={isLoading} />
    </>
  );
}
