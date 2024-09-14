import styles from "./IdeaFeedback.module.css";

export default function IdeaFeedback() {
  return (
    <main className={styles.main}>
      <div className={styles.idea_card}>
        <div className={styles.user_info}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="assets/placeholder.png"
              alt="User"
              className={styles.user_profile_pic}
            />
            <span className={styles.username}>username</span>
          </div>
          <h2 className={styles.idea_title}>Idea Title</h2>
        </div>

        <p className={styles.idea_description}>
          Faucibus lorem, quis adipiscing laoreet ipsum ac urna venenatis
          tincidunt odio vehicula, tincidunt est. Nam maximus leo. Nam enim,
          orci nec sollicitudin, quis libero, consectetur sodales. Ut leo. Nibh
          at tincidunt massa diam lacus, non faucibus Morbi odio ex sapien Lorem
          Quisque maximus ullamcorper viverra non dui massa urna lorem. quis
          Praesent ac vehicula, gravida urna vitae dignissim, placerat. sodales.
          sollicitudin. non elit tortor. facilisis diam nisi odio odio non
          faucibus lorem. quis adipiscing laoreet ipsum ac urna venenatis
          tincidunt odio vehicula, tincidunt est. Nam maximus leo. Nam enim,
          orci nec sollicitudin, quis libero, consectetur sodales. Ut leo. Nibh
          at tincidunt massa diam lacus, non faucibus Morbi odio ex sapien Lorem
          Quisque maximus ullamcorper viverra non dui massa urna lorem. quis
          Praesent ac vehicula, gravida urna vitae dignissim, placerat. sodales.
          sollicitudin. non elit tortor. facilisis diam nisi odio odio non
        </p>
        <div className={styles.attachment}>
          <span>Attachments:</span>
          <button className={styles.attachment_button}>Idea.pdf</button>
        </div>
        <div className={styles.feedback_section}>
          <textarea
            placeholder="Enter your feedback..."
            className={styles.feedback_textarea}
          ></textarea>
          <div className={styles.rating}>
            <span>Ratings:</span>
            <div className={styles.stars}>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <span key={index} className={styles.star}>
                    ★
                  </span>
                ))}
            </div>
          </div>
        </div>
        <button className={styles.submit_button}>Submit</button>
      </div>
    </main>
  );
}
