import { Outlet } from "react-router-dom";
import { Header, Footer } from "../components/index.js";
import styles from "../style.js";

const Layout = () => {
  return (
    <div className="w-full bg-white">
      <div className={`${styles.flexCenter}`}>
        <div className="w-full">
          <Header />
        </div>
      </div>
      <div className="main-content min-h-screen bg-white">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
