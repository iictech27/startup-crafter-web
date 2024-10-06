import { Link, useNavigate } from "react-router-dom";
import ShareIcon from "@mui/icons-material/Share";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./UserProfile.module.css";
import { Button } from "../components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearUser } from "../features/users/userSlice";
import { clearBlogs } from "../features/blog/userBlogSlice";

function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleDelete(e) {
    e.preventDefault();
    console.log(e.target.parentElement);
    e.target.parentElement.classList.add("nonactive");
  }

  const logout = () => {
    const res = axios
      .post("/api/v1/user-logout")
      .then((res) => {
        console.log(res);
        dispatch(clearUser());
        dispatch(clearBlogs());
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });

    console.log(res);
  };

  return (
    <>
      <div className={styles.sectionTop}>
        <div className={styles.left_section}>
          <div className={styles.profile}>
            <div className={styles.box}>
              <div className={styles.userImage}>
                <img src="../../public/assets/Ellipse 25.png" alt="" />
              </div>
            </div>
          </div>

          <div className={styles.info}>
            <h3>Name</h3>
            <div>
              <img src="../../public/assets/image 23.png" alt="" />
              Techno Main Salt Lake
            </div>
          </div>
        </div>

        <div className={styles.right_section}>
          <div className={styles.rightTop}>
            <div className={styles.top}>
              <div className={styles.options}>
                <ShareIcon style={{ height: "15px" }} />
              </div>
              <div className={styles.options}>
                <VisibilityIcon style={{ height: "15px" }} />
              </div>
              <button onClick={() => navigate("/user/edit-profile")}>
                <EditIcon
                  style={{
                    marginRight: "3px",
                    color: "white",
                    height: "14px",
                  }}
                />
                Edit Profile
              </button>
              <Button
                title="Logout"
                onHandleClick={logout}
                btnColor="gradientBtnColor"
              />
            </div>

            <img
              src="../../public/assets/image 26.png"
              alt=""
              className={styles.imageBottom}
            />
          </div>
        </div>
      </div>

      <div className={styles.sectionBottom}>
        <div className={styles.leftSectionBottom}>
          <div className={styles.info}>
            <Link to="/about">About</Link>
            <Link to="/skills">Skills</Link>
            <Link to="/education">Education</Link>
            <Link to="/achievement">Achievement</Link>
            <Link to="/certificate">Certificate</Link>
          </div>
        </div>
        <div className={styles.middleSectionBottom}>
          <div className={styles.rectangle}>
            <div className={styles.rectangleBox}>
              <img src="../../public/assets/image 28.png" alt="" />
              <div>
                <h3>Internship Applied</h3>
                <span>3</span>
              </div>
            </div>

            <div className={styles.rectangleBox}>
              <img src="../../public/assets/image 24.png" alt="" />
              <div>
                <h3>Idea Submission </h3>
                <span>7</span>
              </div>
            </div>

            <div className={styles.rectangleBox}>
              <img src="../../public/assets/image 27.png" alt="" />
              <div>
                <h3>Feedback</h3>
                <span>5</span>
              </div>
            </div>

            <div className={styles.rectangleBox}>
              <img src="../../public/assets/image 25.png" alt="" />
              <div>
                <h3>Blogs</h3>
                <span>4</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightSectionBottom}>
          <div className={styles.about}>
            <span className={styles.title}>About</span>
            <span className={styles.shift}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              placeat maiores harum, eligendi provident voluptatum!
            </span>
          </div>
          <div className={styles.skills}>
            <span className={styles.title}>Skills</span>
            <div className={`${styles.skillsName} ${styles.shift}`}>
              <div>
                Html{" "}
                <span className={styles.cross} onClick={handleDelete}>
                  X{" "}
                </span>{" "}
              </div>
              <div>
                Css{" "}
                <span className={styles.cross} onClick={handleDelete}>
                  X{" "}
                </span>{" "}
              </div>
              <div>
                C++{" "}
                <span className={styles.cross} onClick={handleDelete}>
                  X{" "}
                </span>{" "}
              </div>
            </div>
          </div>
          <div className={styles.education}>
            <span className={styles.title}>Education</span>
            <span className={styles.shift}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus
              nostrum quia aperiam quis, et adipisci!
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
