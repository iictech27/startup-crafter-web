import styles from "./IdeaReview.module.css";
import { Idea } from "../../components";

export default function IdeaReview() {
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
          <Idea />
          <Idea />
          <Idea />
        </div>
      </div>
    </div>
  );
}
