import styles from "../../../style";
import Blogs from "./Blogs";

export default function Blog() {
  return (
    <section className={`mt-44 relative ${styles.sectionFooter}`}>
      <h1 className={`${styles.sectionHead2} font-inria`}>
        Our latest <span className="text-highlight">Blogs</span>
      </h1>
      <p
        className={`${styles.paddingX} ${styles.flexCenter} ${styles.sectionSubHead}`}
      >
        Stay tuned and updated by the recent updates from our blog
      </p>
      <section
        className={`${styles.section2} ${styles.marginX} ${styles.paddingY} justify-between items-center gap-x-8 gap-y-8`}
      >
        <Blogs />
      </section>
    </section>
  );
}
