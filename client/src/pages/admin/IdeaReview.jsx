import styles from "./IdeaReview.module.css";
import { Idea } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllIdeas } from "../../features/ideas/ideaSlice";

export default function IdeaReview() {
  const { ideas, loading, error } = useSelector((state) => state.idea || {});
  const dispatch = useDispatch();

  const [ideasAvailable, setIdeasAvailable] = useState(false);

  useEffect(() => {
    dispatch(fetchAllIdeas());
  }, [dispatch]);

  useEffect(() => {
    if (ideas.length > 0) {
      setIdeasAvailable(true);
    }
  }, [ideas]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error : {error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.right}>
        <div className={styles.category}>
          <span>Categories:</span>
          <div className={styles.categories}>
            <div className={styles.category_slider}>
              <span>Edtech</span>
              <span>Fintech</span>
              <span>Agritech</span>
              <span>Foodtech</span>
              <span>Fintech</span>
              <span>Fintech</span>
              <span>Itech</span>
              <span>Other</span>
            </div>
          </div>
        </div>

        <div className={styles.ideas}>
          {ideasAvailable ? (
            ideas.map((idea, index) => (
              <Idea
                key={index}
                filePath={idea.document}
                ideaDescription={idea.description}
                ideaTitle={idea.title}
                ideaOwner={idea.submittedBy.fullName}
                ideaId={idea.uuid}
                isFeedbackGiven={idea.isFeedbackGiven}
              />
            ))
          ) : (
            <p>No idea has been submitted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
