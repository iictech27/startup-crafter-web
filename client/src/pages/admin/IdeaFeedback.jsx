import { useDispatch, useSelector } from "react-redux";
import styles from "./IdeaFeedback.module.css";
import { useEffect, useState } from "react";
import {
  fetchIdeaForReview,
  sendFeedback,
} from "../../features/ideas/ideaSlice";

export default function IdeaFeedback() {
  const dispatch = useDispatch();
  const idea = useSelector((state) => state.idea.reviewIdea || null);
  // console.log(idea);
  const [ideaId, setIdeaId] = useState(null);
  const [feedback, setFeedback] = useState({
    feedback: "",
    ratings: 0,
  });
  const [isFeedbackSent, setFeedbackSent] = useState(false);

  const handleClick = (index) => {
    setFeedback({ ...feedback, ratings: index + 1 });
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    dispatch(sendFeedback({ ...feedback, ideaId: idea.uuid }));

    setFeedbackSent(true);
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idea = urlParams.get("idea");

    setIdeaId(idea);
  }, [ideaId]);

  useEffect(() => {
    dispatch(fetchIdeaForReview(ideaId));
  }, [dispatch, ideaId]);

  return (
    <main className={styles.main}>
      {idea ? (
        isFeedbackSent || idea.isFeedbackGiven ? (
          <p>Feedback sent !</p>
        ) : (
          <div className={styles.idea_card}>
            <div className={styles.user_info}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexBasis: "50%",
                }}
              >
                <img
                  src="assets/placeholder.png"
                  alt="User"
                  className={styles.user_profile_pic}
                />
                <span className={styles.username}>
                  {idea?.submittedBy.fullName
                    .split(" ")
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    )
                    .join(" ")}
                </span>
              </div>
              <h2 className={styles.idea_title}>{idea?.title}</h2>
            </div>

            <p className={styles.idea_description}>{idea?.description}</p>
            <div className={styles.attachment}>
              <span>Attachments:</span>
              <a
                href={idea?.document}
                download="Idea.pdf"
                className={styles.attachment_button}
              >
                Idea.pdf
              </a>
            </div>
            <form className={styles.feedback_section}>
              <textarea
                value={feedback.feedback}
                onChange={(e) =>
                  setFeedback({ ...feedback, feedback: e.target.value })
                }
                placeholder="Enter your feedback..."
                className={styles.feedback_textarea}
              ></textarea>
              <div className={styles.ratings_form}>
                <div className={styles.stars}>
                  <span>Ratings:</span>
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <span
                        key={index}
                        className={`${styles.star} ${
                          index < feedback.ratings ? "" : styles.filled
                        }`}
                        onClick={() => handleClick(index)}
                      >
                        ★
                      </span>
                    ))}
                </div>
                <button
                  onClick={handleSubmitFeedback}
                  className={styles.submit_button}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )
      ) : (
        <p>Idea not found !</p>
      )}
    </main>
  );
}
