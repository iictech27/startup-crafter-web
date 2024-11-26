import { Link } from "react-router-dom";
import styles from "./Idea.module.css";

export default function Idea({
  filePath,
  ideaTitle,
  ideaDescription,
  ideaOwner,
  ideaId,
}) {
  return (
    <>
      <div className={styles.idea}>
        <div className={styles.ideaOwner}>
          <h1>{ideaTitle} </h1>
          <div className={styles.ideaOwnerInfo}>
            <img src="svsdvsvd" alt="avatar" />
            <h1>
              {ideaOwner
                .split(" ")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join(" ")}
            </h1>
          </div>
        </div>

        <div className={styles.ideaDetail}>
          <p> {ideaDescription}</p>
        </div>

        <div className={styles.attachments}>
          <div className={styles.attachment}>
            <span>Attachments:</span>
            <a
              href={filePath}
              download="Idea.pdf"
              className={styles.file_button}
            >
              Idea.pdf
            </a>
          </div>
          <Link
            to={`/admin/idea-feedback?idea=${ideaId}`}
            className={styles.feedbackBtn}
          >
            {" "}
            Give Feedback{" "}
          </Link>
        </div>
      </div>
    </>
  );
}
