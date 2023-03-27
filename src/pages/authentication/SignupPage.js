import React, { useState } from "react";
import classes from "./auth.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../../assets/brand/envie.svg";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import images from "../../assets/data/loginPhotos";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { FcGoogle } from "react-icons/fc";
import { GrFacebookOption } from "react-icons/gr";
import { AiFillApple } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";
import validator from "validator";
import Footer from "../../layouts/footer/Footer";
import axios from "../../requests/axios"
import routes from "../../requests/routes"



/**
 * Component that renders Signup page
 * 
 * @component
 * @example
 * return(<SignupPage />)
 */
const SignupPage = () => {
  const [cont, setContinue] = useState(false);
  const [loader, setLoader] = useState(false);
  const [randImg, setrandImg] = useState(Math.floor(Math.random() * 3));
  const [dropDown, setDropDown] = useState(false);
  const [myEmail, setMyEmail] = useState();

  const initialValues = {
    emailAddress: "",
    confirmemail: "",
    firstName: "",
    lastName: "",
    password: "",
  };
  const contFn = () => {
    if (validator.isEmail(myEmail)) {
      setLoader(true);
      setTimeout(() => {
        setLoader(false);
        setContinue(true);
      }, 800);
    }
  };

  const validationSchema = Yup.object().shape({
    emailAddress: Yup.string()
      .min(3)
      .email("Invalid email address")
      .required(" Email field is required"),
    confirmemail: Yup.string()
      .required("Please confirm your Email")
      .oneOf(
        [Yup.ref("emailAddress")],
        "Email address doesn't match. Please try again"
      ),

    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    password: Yup.string().min(8).required("Field required"),
  });


  /**
   * Submits the form signup data to the server
   * @namespace onSubmit 
   * @param   {string} email      User valid email
   * @param   {string} confirmemail      User input matching email
   * @param   {string} firstName      User valid first name
   * @param   {string} lastName      User valid last name
   * @param   {string} password   User password
   */

 /**
   * Submits the email and go to another form 
   * @namespace contFn
   * @param   {string} email      check if It's avalid email or not 
   */

  const handleSubmit = (data, { resetForm }) => {
    console.log(data);

    async function sendData(){
      try{
        const request = await axios.post(routes.signUp, data)
        console.log(request)
        
      } catch(err){
        
        resetForm()
      }
    }
    sendData()

    //onSubmit(data);
  };

  return (
    <div>
      <div className={classes.main}>
        <div className={classes.info}>
          <div className={classes.form}>
            <Link to="/" className={classes.logoContainer}>
              <div>
                <img src={logo} alt="Envie Logo" />
              </div>
            </Link>
            <div className={classes.header}>
              <h1 style={{ marginBottom: "3rem" }}>
                Create an <br></br>account{" "}
              </h1>
              <Link to="/login">
                <p className={classes.smallScreenlink}>Log in</p>
              </Link>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values }) => (
                <Form>
                  {setMyEmail(values.emailAddress)}
                  <div className={classes.boxContainer}>
                    <div
                      className={classes.fieldContainer}
                      style={{ backgroundColor: !cont ? "none" : "#f8f7fa" }}
                    >
                      <label className={classes.label}> Email address </label>
                      <Field 
                        className={classes.field}
                        id="emailAddress"
                        name="emailAddress"
                        autoComplete="off"
                        disabled={cont}
                        data-testid="EmailFieldInput"
                      />
                    </div>
                    <ErrorMessage name="emailAddress" component="span" />
                  </div>
                  {!cont ? (
                    <div className={classes.btn}>
                      <button type="button" className={classes.button} onClick={contFn} data-testid="ContinueBtn">
                        {loader ? (
                          <TailSpin
                            height="25"
                            width="20"
                            color="#ffffffff"
                            ariaLabel="tail-spin-loading"
                            radius="2"
                            wrapperStyle={{}}
                            wrapperClass={classes.loader}
                            visible={true}
                          />
                        ) : (
                          <p>Continue</p>
                        )}
                      </button>
                    </div>
                  ) : null}
                  <div className={cont ? classes.formshow : classes.formhide}>
                    <div className={classes.boxContainer}>
                      <div className={classes.fieldContainer}>
                        <label className={classes.label}> Confirm email</label>
                        <Field
                          className={classes.field}
                          name="confirmemail"
                          placeholder="Confirm Email"
                          autoComplete="off"
                          data-testid="Confirmemailfield"
                        />
                      </div>
                      <ErrorMessage name="confirmemail" component="span" />
                    </div>
                    <div className={classes.name}>
                      <div className={classes.boxContainer}>
                        <div className={classes.fieldContainer}>
                          <label className={classes.label}> First Name</label>
                          <Field
                            className={classes.field}
                            name="firstName"
                            placeholder="First Name"
                            autoComplete="off"
                            data-testid="FirstNamefield"
                          />
                        </div>
                        <ErrorMessage name="firstName" component="span" />
                      </div>
                      <div className={classes.boxContainer}>
                        <div className={classes.fieldContainer}>
                          <label className={classes.label}> Last Name</label>
                          <Field
                            className={classes.field}
                            name="lastName"
                            placeholder="Last Name"
                            autoComplete="off"
                            data-testid="LastNamefield"
                          />
                        </div>
                        <ErrorMessage name="lastName" component="span" />
                      </div>
                    </div>
                    <div className={classes.boxContainer}>
                      <div className={classes.fieldContainer}>
                        <label className={classes.label}> Password</label>
                        <Field
                          className={classes.field}
                          name="password"
                          type="password"
                          placeholder="Password"
                          autoComplete="off"
                          data-testid="Passwordfield"
                        />
                      </div>
                      <ErrorMessage name="password" component="span" />
                    </div>
                    <div className={classes.linearLine}></div>
                    <span className={classes.mssg}>
                      {" "}
                      Your password must be at least 8 characters{" "}
                    </span>
                    <div
                      className={classes.btn}
                      style={{ margin: "2rem auto" }}
                    >
                      <button type="submit" className={classes.button} data-testid="CreateBtn">
                        Create account
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            {!cont ? (
              <>
                <div className={classes.splitfield}>
                  <hr className={classes.hr_split} />
                  <div className={classes.splittext}>or</div>
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
                    Other sign up methods{" "}
                    <FaChevronDown className={classes.downArrow} size={12} />
                  </h3>
                  <ul
                    className={dropDown ? classes.showDropDown : null}
                    style={{ paddingLeft: "3.5rem" }}
                  >
                    <li style={{ backgroundColor: "#1877f2" }}>
                      <div>
                        <GrFacebookOption className={classes.methodsIcon} />
                      </div>
                    </li>
                  </ul>
                </div>
              </>
            ) : null}
            <Link to="/login">
              <p className={classes.wideScreenlink}>Log in</p>
            </Link>
          </div>
        </div>
        <div
          className={classes.image}
          style={{ backgroundImage: `url(${images[randImg]})` }}
        ></div>
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;
