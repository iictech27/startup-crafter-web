import logo from "../../assets/logo.png";
import styles from "../../style";
import { footerLinks } from "../../constants/index.js";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <section
      className={`flex flex-col lg:flex-row lg:justify-around ${styles.paddingX} ${styles.paddingY} border border-t-1`}
    >
      <div className={`${styles.flexCenter} p-8`}>
        <Link to="/">
          <img
            src={logo}
            alt="Startup crafter"
            className="w-[150px] h-[50px]"
          />
        </Link>
      </div>
      <div className="basis-1/2 flex flex-wrap gap-y-6 justify-between p-8">
        {footerLinks.map((link, index) => (
          <div key={index} className="flex flex-col gap-y-4 md:gap-y-6">
            <h3 className="text-base font-inter font-bold uppercase text-gray-500">
              {link.title}
            </h3>
            <ul className="transition ease-in-out">
              {link.list.map((links) => (
                <li
                  key={links.id}
                  className="w-[100px] relative mt-4 font-semibold cursor-pointer transition ease-in hover:translate-x-2"
                >
                  {links.title}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="flex justify-end items-end gap-x-4">
          <Link to="/" className="border border-gray-500 rounded-full p-3">
            <img
              src="src/assets/icons/fb_icon.svg"
              alt="footer"
              className="w-6 h-6"
            />
          </Link>
          <Link to="/" className="border border-gray-500 rounded-full p-3">
            <img
              src="src/assets/icons/x_icon.svg"
              alt="footer"
              className="w-6 h-6"
            />
          </Link>
          <Link to="/" className="border border-gray-500 rounded-full p-3">
            <img
              src="src/assets/icons/insta_icon.svg"
              alt="footer"
              className="w-6 h-6"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
