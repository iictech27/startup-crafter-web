import styles from "../../style";
import { Link } from "react-router-dom";
import Card from "../../layout/Card";
import Pagination from "../Pagination";
import Button from "../Button";
import useFetchData from "../../hooks/useFetchData";
import usePagination from "../../hooks/usePagination";
import TopicLoadingCard from "./TopicLoadingCard";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchAllTopics } from "../../features/study_material/studyMaterialSlice";

export default function RecommendedTopics() {
  const dispatch = useDispatch();
  const { topics, loading, error } = useSelector(
    (state) => state.studyMaterial || {}
  );
  // console.log(topics);
  const [topicsAvailable, setTopicsAvailable] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(3);
  const [currentItem, currentPage, setCurrentPage] = usePagination(itemsToShow);

  useEffect(() => {
    dispatch(fetchAllTopics());
  }, [dispatch]);

  useEffect(() => {
    if (topics.length > 0) {
      setTopicsAvailable(true);
    }
  }, [topics]);

  if (error) return <div>Error : {error}</div>;

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-x-8 gap-y-8 lg:h-[60vh]">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {topicsAvailable ? (
            !loading ? (
              topics
                .map((topic, index) => (
                  <Card key={index} img={topic.cover_image}>
                    <h3 className="text-xl w-5/6 font-inter font-bold">
                      {topic?.title}
                    </h3>
                    <p className="text-blue-900">
                      {topic?.description.substring(0, 200)}...
                    </p>
                    <Link
                      to={topic?.title.split(" ").join("-").toLowerCase()}
                      className="text-pink-600 text-xl flex items-center gap-x-2"
                    >
                      <span className="underline">Start this track</span>{" "}
                      <i className="fa-solid fa-circle-arrow-right"></i>
                    </Link>
                  </Card>
                ))
                .slice(currentItem.start, currentItem.end)
            ) : (
              [1, 2, 3].map((index) => <TopicLoadingCard key={index} />)
            )
          ) : (
            <div className="text-2xl text-center col-span-1 sm:col-span-2 lg:col-span-3">
              No Topics Available...{" "}
            </div>
          )}
        </div>
      </div>
      <Pagination
        type="simple"
        className="text-white bg-pink-600"
        totalItems={topics.length}
        itemsToShow={itemsToShow}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export function Topics() {
  const { data, isLoading, setIsLoading } = useFetchData(
    "/src/data/programming_topics.json"
  );
  const [page, setPage] = useState(8);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 750);
  }, [pathname]);

  return (
    <div className="flex flex-col items-center">
      <Button title="Programming" btnColor="gradientBtnColor" />
      {!isLoading ? (
        <InfiniteScroll
          dataLength={data.length}
          hasMore={page <= data.length ? true : false}
          next={() => setPage(page + 8)}
          loader={<h1>Loading...</h1>}
          endMessage={<section className={`${styles.sectionFooter}`}></section>}
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {data.map((topic, index) => (
            <Card key={index} img={topic.image_link}>
              <h3 className="text-xl w-5/6 font-inter font-bold">
                {topic.title}
              </h3>
              <p className="text-blue-900">{topic.description}...</p>
              <div className="text-pink-600 text-xl flex items-center gap-x-2">
                <Link to={topic.title.split(" ").join("-").toLowerCase()}>
                  <span className="underline">Start this track</span>
                </Link>{" "}
                <i className="fa-solid fa-circle-arrow-right"></i>
              </div>
            </Card>
          ))}
        </InfiniteScroll>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((index) => (
            <TopicLoadingCard key={index} />
          ))}
        </div>
      )}
    </div>
  );
}
