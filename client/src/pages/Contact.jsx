import React, { useState } from "react";
import styles from "../style";
import { Button, Input,InputButton } from "../components/index";
//images and vectors
import amico from "../assets/images/amico.png";
import HeadingBg from "../components/HeadingBg";
import form_texture1 from "../assets/vectors/login_texture1.png";
import form_texture2 from "../assets/vectors/login_texture2.png";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setSubmitted(true);

    // Reset form data
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <section
      className={`${styles.paddingX} ${styles.paddingY} flex items-start flex-col gap-y-6 overflow-x-hidden`}
    >
      <div className="w-full flex justify-evenly items-center flex-col gap-y-6 text-center relative">
        <h2 className={`${styles.signHead} relative z-10`}>
          <span className="text-blue-500">Contact</span> Us
        </h2>
        <HeadingBg className="w-[100px] md:w-[320px] h-[100px] md:h-[180px] -top-4 md:-top-12 left-[50%]" />
        <div className="flex gap-x-20 text-lg z-[10]">
          <div>
            <i className="fa-solid fa-phone"></i>
            <span> Phone: +91 99033 42634</span>
          </div>
          <div>
            <i className="fa-regular fa-envelope"></i>
            E-mail: <span>iic.tmsl@gmail.com</span>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col-reverse md:flex-row justify-center items-center">
        <div className="basis-1/2">
          <img src={amico} alt="Illustration" />
        </div>
        <div className="relative px-6 py-6 lg:py-14 rounded-3xl w-full lg:w-1/2 flex flex-col gap-y-8 shadow-lg overflow-hidden">
          {submitted ? (
            <div className="thank-you-message">
              <h3>Thank you for your message!</h3>
              <p>We will get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="z-10">
              <Input
                label="FULLNAME"
                type="text"
                placeholder="NAME"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                label="EMAIL ID"
                type="email"
                placeholder="EMAIL"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label className="ml-2 text-base sm:text-lg md:text-xl">
                MESSAGE
              </label>
              <textarea className="mt md:mt-2 mb-10 w-full p-1.5 md:p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring h-[10rem]"></textarea>
              <InputButton title="Submit" btnColor="bg-violetBtnColor" />
            </form>
          )}
          <img
            src={form_texture1}
            alt="form texture 1"
            className="absolute top-0 right-0"
          />
          <img
            src={form_texture2}
            alt="form texture 2"
            className="absolute left-0 bottom-0"
          />
        </div>
      </div>
    </section>
  );
}
