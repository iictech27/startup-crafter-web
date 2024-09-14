import styles from "../../../style";

export default function HeroCard({
  children,
  bg,
  center,
  imgLink,
  imgClassName,
}) {
  return (
    <>
      <section
        className={`relative ${styles.section} lg:flex-row justify-center ${bg && "bg-blue-100"} ${styles.marginX}`}
      >
        <div
          className={`${center ? `${styles.flexCenter}` : `${styles.flexStart} lg:pl-10 md:px-18`} flex-col gap-y-4 md:gap-y-6 lg:gap-y-14 py-6 md:py-10 lg:w-2/4`}
        >
          {children}
        </div>
        <div className="lg:w-4/6">
          {imgLink && (
            <img
              src={imgLink}
              alt="Hero Image"
              className={`lg:w-[55rem] lg:h-[45rem] object-contain ${imgClassName}`}
              loading="lazy"
            />
          )}
        </div>
      </section>
    </>
  );
}
