import React, { useState } from "react";
import classes from "./auth.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../../assets/brand/envie.svg";
import images from "../../assets/data/loginPhotos";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { GrFacebookOption } from "react-icons/gr";
import { AiFillApple } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";
import Footer from "../../layouts/footer/Footer";

/**
 * Component that renders Login Page
 * 
 * @component
 * @example
 * return(<LoginPage />)
 */

const LoginPage = ({onSubmit}) => {
  const [randImg, setrandImg] = useState(Math.floor(Math.random() * 3));
  const [dropDown, setDropDown] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .min(3)
      .email("Please enter a valid email address")
      .required("Please enter a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  /**
 * Submits the form login data to the server
 * @param   {string} email      User valid email
 * @param   {string} password   User password
 */

  const handleSubmit = (data, { resetForm }) => {
    console.log(data);
    onSubmit(data)
  };

  return (
    <div data-testid="LoginComponent">
      <div className={classes.main}>
        <div className={classes.info}>
          <div className={classes.form}>
            <Link to="/" className={classes.logoContainer}>
              <div>
                <img src={logo} alt="Envie Logo" />
              </div>
            </Link>
            <div className={classes.header}>
              <h1>Log in</h1>
              <Link to="/signup">
                <p className={classes.smallScreenlink}>Signup</p>
              </Link>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}>
              <Form>
                <div className={classes.boxContainer}>
                  <div className={classes.fieldContainer}>
                    <label className={classes.label}> Email address</label>
                    <Field
                      className={classes.field}
                      name="email"
                      autoComplete="off"
                      data-testid="LoginFormEmailInput"
                    />
                  </div>
                  <ErrorMessage name="email" component="span" data-testid="emailError"/>
                </div>
                <div className={classes.boxContainer}>
                  <div className={classes.fieldContainer}>
                    <label className={classes.label}> Password</label>
                    <Field
                      className={classes.field}
                      name="password"
                      type="password"
                      autoComplete="off"
                      data-testid="LoginFormPasswordInput"
                    />
                  </div>
                  <ErrorMessage name="password" component="span" />
                </div>

                <div className={classes.btn}>
                  <button type="submit" className={classes.button} data-testid="LoginFormSubmitButton">
                    Log in
                  </button>
                </div>
              </Form>
            </Formik>
            <p className={classes.screenLink}>Forgot password?</p>
            <div className={classes.splitfield}>
              <hr className={classes.hr_split} />
              <div className={classes.splittext}>or</div>
            </div>
            <div className={classes.btn1}>
              <button className={classes.btn1}>
                {" "}
                <p>Email me a login link</p>
              </button>
            </div>
            <div className={classes.btn1}>
              <button className={classes.btn1}>
                {" "}
                <FcGoogle className={classes.icon} />{" "}
                <p> Sign in with Google </p>
              </button>
            </div>
            <div className={classes.methods}>
              <h3 onClick={() => setDropDown(!dropDown)}>
                Other login methods{" "}
                <FaChevronDown className={classes.downArrow} size={12} />
              </h3>
              <ul className={dropDown ? classes.showDropDown : null}>
                <li style={{ backgroundColor: "#1877f2" }}>
                  <div>
                    <GrFacebookOption className={classes.methodsIcon} />
                  </div>
                </li>
                <li style={{ backgroundColor: "#4b4d63" }}>
                  <div>
                    <AiFillApple className={classes.methodsIcon} />
                  </div>
                </li>
              </ul>
            </div>

            <Link to="/signup">
              <p className={classes.wideScreenlink}>Signup</p>
            </Link>
          </div>
        </div>
        <div
          className={classes.image}
          style={{ backgroundImage: `url(${images[randImg]})` }}></div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
