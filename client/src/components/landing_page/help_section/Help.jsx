import styles from "../../../style";
import Helps from "./Helps";
import HeadingBg from "../../HeadingBg";

export default function Help() {
  return (
    <section className="mt-44 relative">
      <h1 className={`${styles.sectionHead2} font-inria`}>
        How can we <span className="text-primary">help</span>
      </h1>
      <HeadingBg />
      <section
        className={`${styles.section} ${styles.marginX} ${styles.paddingY} justify-center items-center`}
      >
        <Helps />
      </section>
    </section>
  );
}
