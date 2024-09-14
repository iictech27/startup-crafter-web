import React, { useState } from "react";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import styles from "./EditUserProfile.module.css";

export default function EditUserProfile() {
  const [inputData, setInputData] = useState({
    fullName: "",
    lastName: "",
    userName: "",
    email: "",
    mobile: "",
    organisation: "",
    courseSpecialisation: "",
  });

  function handleInput() {
    const { name, value } = e.target;

    setInputData({
      ...inputData,
      [name]: value,
    });
  }

  function getImage() {}

  return (
    <div className={styles.edit_profile}>
      <div className={styles.left}>
        <div className={styles.upload_resume}>
          <label htmlFor={styles.file}>
            {" "}
            <img
              src="../../public/assets/image 26.png"
              width="300px"
              style={{ cursor: "pointer" }}
            />
          </label>
          <input
            type="file"
            id="file"
            onChange={getImage}
            style={{ display: "none" }}
            multiple
          />
        </div>

        <div className={styles.profile_completion}>
          <h3>Complete your profile</h3>
          <p>And standout to recruiters!</p>
          <div className={styles.progress_bar}>
            <div className={styles.progress} style={{ width: "75%" }}></div>
          </div>
        </div>

        <div className={styles.profile_sections}>
          <div
            className={`${styles.section} ${styles.active}`}
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            {" "}
            <HistoryToggleOffIcon />
            Basic Details
          </div>
          <div
            className={styles.section}
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            {" "}
            <HistoryToggleOffIcon />
            About
          </div>
          <div
            className={styles.section}
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            {" "}
            <HistoryToggleOffIcon />
            Skills
          </div>
          <div
            className={styles.section}
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            {" "}
            <HistoryToggleOffIcon />
            Education
          </div>
          <div
            className={styles.section}
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            {" "}
            <HistoryToggleOffIcon />
            Work Experience
          </div>
          <div
            className={styles.section}
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            <HistoryToggleOffIcon />
            Responsibilities
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.basic_details}>
          <h2>Basic Details</h2>
          <div style={{ display: "flex" }}>
            <div className={styles.profile_picture}>
              <img
                src="../../public/assets/Ellipse 25.png"
                alt="Profile"
                width="500px"
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <div className={styles.input_group}>
                <label>First Name</label>
                <input
                  type="text"
                  value={inputData.firstName}
                  onChange={handleInput}
                />
              </div>
              <div className={styles.input_group}>
                <label>Last Name</label>
                <input
                  type="text"
                  value={inputData.lastName}
                  onChange={handleInput}
                />
              </div>
              <div className={styles.input_group}>
                <label>Username</label>
                <input
                  type="text"
                  value={inputData.userName}
                  onChange={handleInput}
                  width="70vw"
                />
              </div>
            </div>
          </div>
          <div className={styles.input_group}>
            <label>Email</label>
            <input
              type="email"
              value={inputData.email}
              onChange={handleInput}
            />
          </div>
          <div className={styles.input_group}>
            <label>Mobile</label>
            <input
              type="text"
              value={inputData.mobile}
              onChange={(e) => handleInput}
            />
          </div>
          <div className={styles.input_group}>
            <label>Pronouns</label>
            <div className={styles.pronouns}>
              <label>
                <input type="radio" name="pronouns" value="he/him" checked />
                He/Him/His
              </label>
              <label>
                <input type="radio" name="pronouns" value="she/her" />
                She/Her
              </label>
              <label>
                <input type="radio" name="pronouns" value="they/them" />
                Them/They
              </label>
              <label>
                <input type="radio" name="pronouns" value="do-not-show" />
                Do not want to show
              </label>
            </div>

            <div className={styles.input_group}>
              <label>Course Specialisation</label>
              <input
                type="text"
                value={inputData.courseSpecialisation}
                onChange={handleInput}
                width="70vw"
              />
            </div>

            <div className={styles.input_group}>
              <label>Organisation / College</label>
              <input
                type="text"
                value={inputData.organisation}
                onChange={handleInput}
                width="70vw"
              />
            </div>
          </div>
        </div>

        <button className={styles.save_button}>Save</button>
      </div>
    </div>
  );
}
