import React, { useState, useEffect } from "react";
import styles from "../style";
import feedback_image from "/assets/images/feedback.jpg";
import { Button } from "../components";
import HeadingBg from "../components/HeadingBg";
import { HeadingBg2 } from "../components/HeadingBg";
import longVector from "/assets/vectors/longVector.png";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([
    {
      name: "Ashish Sharma",
      rating: 4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
      date: "5 days ago",
      likes: 1,
      dislikes: 0,
    },
    {
      name: "Ashish Sharma",
      rating: 4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
      date: "5 days ago",
      likes: 3,
      dislikes: 1,
    },
  ]);
  const [overallRating, setOverallRating] = useState(0);

  useEffect(() => {
    const calculateOverallRating = () => {
      if (reviews.length === 0) return 0;
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      return (totalRating / reviews.length).toFixed(1);
    };
    setOverallRating(calculateOverallRating());
  }, [reviews]);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleReviewSubmit = () => {
    if (review.trim()) {
      setReviews([
        ...reviews,
        {
          name: "New User",
          rating: rating,
          text: review,
          date: "just now",
          likes: 0,
          dislikes: 0,
        },
      ]);
      setReview("");
      setRating(0);
    }
  };

  const handleLike = (index) => {
    const updatedReviews = [...reviews];
    updatedReviews[index].likes += 1;
    setReviews(updatedReviews);
  };

  const handleDislike = (index) => {
    const updatedReviews = [...reviews];
    updatedReviews[index].dislikes += 1;
    setReviews(updatedReviews);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="star full">
            &#9733;
          </span>
        ))}
        {halfStar && <span className="star half">&#9733;</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="star empty">
            &#9733;
          </span>
        ))}
      </>
    );
  };

  return (
    <div className="md:mt-8 z-10 p-5">
      <div
        className={`relative ${styles.section3} justify-center items-center gap-y-8`}
      >
        <h2 className="relative text-3xl md:text-5xl font-inknut font-bold text-violet-500">
          Feedback
          <HeadingBg2 className="-top-6 md:-top-8 -right-24 md:-right-44 md:w-64 md:h-20" />
        </h2>
        <div className="feedback-img w-full h-[40vh] rounded shadow-lg">
          <img
            src={feedback_image}
            alt="svgfile"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="rating-section">
          <h3 className="text-xl md:text-3xl font-bold font-inria text-center drop-shadow-md">
            How likely are you to rate our app?
          </h3>
          <div className="flex justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                id="cont"
                key={star}
                className={`stars text-4xl md:text-6xl drop-shadow-md cursor-pointer ${
                  rating >= star ? "text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => handleRating(star)}
              >
                &#9733;
              </span>
            ))}
          </div>
        </div>
        <textarea
          className="w-[70%] bg-gray-300 p-2.5 md:p-4 text-black"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write a review"
        />
        <Button
          title="submit"
          btnColor="bg-blue-700"
          onHandleClick={handleReviewSubmit}
        />
        <svg
          height="100"
          width="100"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-28 -right-24 -z-10 drop-shadow-lg"
        >
          <circle r="30" cx="50" cy="50" fill="#f19494" />
        </svg>
        <svg
          height="120"
          width="120"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 -right-44 -z-10  drop-shadow-lg"
        >
          <circle r="60" cx="60" cy="60" fill="#fede36" />
        </svg>
      </div>

      <div
        className={`mt-28 md:mt-44 ${styles.section3} justify-center items-center relative gap-y-8`}
      >
        <h2 className="font-inknut text-3xl md:text-5xl text-center drop-shadow-md z-[10]">
          <span className="text-violet-500">Customer</span> Review {""}
          <i className="text-violet-500 fa-regular fa-pen-to-square"></i>
        </h2>
        <HeadingBg />
        <div
          className={`overall-rating text-lg md:text-2xl ${styles.flexCenter} flex-col gap-y-3 z-10`}
        >
          <h3 className="">OVERALL RATING</h3>
          <div className="stars flex justify-center text-3xl md:text-4xl text-yellow-400">
            {renderStars(overallRating)}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">{overallRating}</h1>
        </div>

        {reviews.map((review, index) => (
          <div
            key={index}
            className="review flex flex-col border rounded relative shadow-md px-6 md:px-10 py-6"
          >
            <div
              className={`review-header ${styles.flexBetween} flex-wrap mb-4`}
            >
              <div className="review-header-left flex flex-wrap items-center">
                <img
                  src={`https://i.pravatar.cc/150?img=${index + 1}`}
                  alt="avatar"
                  className="size-14 md:size-20 mr-6 rounded-[20px]"
                />
                <div>
                  <h4 className="text-lg md:text-xl font-semibold font-imprima">
                    {review.name}
                  </h4>
                  <div className="stars flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star text-xl md:text-2xl ${
                          review.rating >= star
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        &#9733;
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="review-header-right text-base md:text-lg">
                <span>{review.date}</span>
              </div>
            </div>
            <p className="text-sm md:text-base font-imprima mb-4">
              {review.text}
            </p>
            <div
              className={`review-footer ${styles.flexBetween} border-t-2 text-gray-500`}
            >
              <div className="review-footer-left mt-4">
                <button onClick={() => handleLike(index)} className="">
                  <span className="material-symbols-outlined text-xl">
                    thumb_up
                  </span>
                  {review.likes}
                </button>
                <button onClick={() => handleDislike(index)} className="">
                  <span className="material-symbols-outlined text-xl ml-8">
                    thumb_down
                  </span>
                  {review.dislikes}
                </button>
              </div>
              <div className="review-footer-right">
                <button>Report</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="relative flex justify-center items-center min-h-full mx-auto overflow-hidden">
      <Feedback />
      <img
        src={longVector}
        alt="vector"
        className="absolute left-0 top-0 w-[40%] h-full"
      />
    </div>
  );
};

export default App;
