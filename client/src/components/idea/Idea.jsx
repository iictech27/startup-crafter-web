import { useNavigate } from "react-router-dom";
import styles from "./Idea.module.css";

export default function Idea({
  pdfPath = "#",
  fileName = "Idea.pdf",
  ideaDetail = "Tenu Me lav kr da be matlab kr da baho main aa soriyen bas aaj raat ke liye saadi ta desi hai adda sade pe ho jaye fida , subah hone na saam hone na de eek dusre ko hum sone na de mai tera hero haan hero. Tenu Me lav kr da be matlab kr da baho main aa soriyen bas aaj raat ke liye saadi ta desi hai adda sade pe ho jaye fida , subah hone na saam hone na de eek dusre ko hum sone na de mai tera hero haan hero.",
}) {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.idea}>
        <div className={styles.ideaOwner}>
          <img src="assets/placeholder.png"></img>
          <h1>Username</h1>
        </div>

        <div className={styles.ideaDetail}>
          <p> {ideaDetail}</p>
        </div>

        <div className={styles.attachments}>
          <div className={styles.attachment}>
            <span> Attachments</span>
            <a
              href={pdfPath}
              download={fileName}
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
