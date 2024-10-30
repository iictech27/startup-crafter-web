import { useNavigate } from "react-router-dom";
import styles from "./Idea.module.css";

export default function Idea({
  filePath,
  ideaTitle,
  ideaDescription,
  ideaOwner,
}) {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.idea}>
        <div className={styles.ideaOwner}>
          <h1>Idea Title : {ideaTitle} </h1>
          <h1>{ideaOwner}</h1>
        </div>

        <div className={styles.ideaDetail}>
          <p> {ideaDescription}</p>
        </div>

        <div className={styles.attachments}>
          <div className={styles.attachment}>
            <span> Attachments</span>
            <a
              href={filePath}
              download="Idea.pdf"
              className={styles.file_button}
            >
              Idea.pdf
            </a>
          </div>
          <button onClick={() => navigate("/feedback")}> Give Feedback </button>
        </div>
      </div>
    </>
  );
}
