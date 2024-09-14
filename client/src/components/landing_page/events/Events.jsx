import styles from "../../../style";
import ellipse from "../../../assets/images/ellipse.png";
import { events } from "../../../constants/index";
import Button from "../../Button";
import HeadingBg from "../../HeadingBg";

export default function Events() {
  return (
    <section className={`mt-44 relative ${styles.sectionFooter}`}>
      <h1 className={`${styles.sectionHead2} font-inria`}>
        our <span className="text-primary">events</span>
      </h1>
      <p
        className={`${styles.paddingX} ${styles.flexCenter} ${styles.sectionSubHead}`}
      >
        Have a look at our recent events
      </p>
      <HeadingBg />
      <section
        className={`${styles.section2} ${styles.marginX} ${styles.marginY} ${styles.paddingY} justify-evenly items-center gap-x-8 gap-y-8`}
      >
        {events.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-y-10">
            <img src={item.imgLink} alt="event" className="w-full h-full" />
            <Button title={item.name} large />
          </div>
        ))}
      </section>
    </section>
  );
}
