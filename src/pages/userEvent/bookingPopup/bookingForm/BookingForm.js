import React from "react";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import classes from "./bookingform.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import routes from "../../../../requests/routes";
import * as Yup from "yup";
import logo from "../../../../assets/brand/envie.svg";
import Timer from "../timer/timer";

const BookingForm = (props) => {
  const [startTime, setTime] = useState(Date.now());

  const initialValues = {
    firstName: "",
    surName: "",
    email: "",
    TOSCheckbox: false,
    updateCheckbox: true,
    emailCheckbox: true,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please Enter a Valid Email")
      .required("Please enter a valid email"),
    firstName: Yup.string().required("First Name is required."),
    surName: Yup.string().required("Surname is required."),
  });
  function handleSubmit(data) {
    props.onRegister(data.firstName, data.surName, data.email);
  }

  function handleTimeout() {
    props.setTimeout();
  }

  return (
    <div className={classes.main}>
      <div className={classes.mainheader}>
        <h1>Checkout</h1>
        <Timer start={startTime} onFinish={handleTimeout} />
      </div>
      <div className={classes.contactInfo}>
        <h2>Contact Information</h2>
        <div className={classes.form}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(props) => (
              <Form>
                <div className={classes.Namecontainer}>
                  <div className={classes.boxContainer}>
                    <div className={classes.NameField}>
                      <label>First Name</label>
                      <Field
                        type="text"
                        name="firstName"
                        autoComplete="off"
                        className={classes.Field}
                      />
                    </div>
                    <ErrorMessage name="firstName" component="span" />
                  </div>
                  <div className={classes.boxContainer}>
                    <div className={classes.NameField}>
                      <label>Surname</label>
                      <Field
                        type="text"
                        name="surName"
                        autoComplete="off"
                        className={classes.Field}
                      />
                    </div>
                    <ErrorMessage name="surName" component="span" />
                  </div>
                </div>
                <div className={classes.emailContainer}>
                  <div className={classes.boxContainer}>
                    <div className={classes.NameField}>
                      <label>Email</label>
                      <Field
                        type="email"
                        name="email"
                        autoComplete="off"
                        className={classes.Field}
                      />
                    </div>
                    <ErrorMessage name="email" component="span" />
                  </div>
                </div>
                <div className={classes.checkboxContainer}>
                  <div className={classes.checkbox}>
                    <Field type="checkbox" name="updateCheckbox" />
                    <label onClick={props.checked}>
                      {" "}
                      Keep me updated on more events and news from this event
                      organizer.
                    </label>
                  </div>
                  <div className={classes.checkbox}>
                    <Field type="checkbox" name="emailCheckbox" />
                    <label>
                      Send me emails about the best events happening nearby or
                      online.
                    </label>
                  </div>
                  <div className={classes.checkbox}>
                    <Field type="checkbox" name="TOSCheckbox" />
                    <label>I accept the Eventbrite Terms of Service.</label>
                  </div>
                </div>
                <div className={classes.registerfooter}>
                  <div>Powered By</div>
                  <img className={classes.logo} src={logo} alt="Logo" />
                </div>
                <div className={classes.registercontainer}>
                  <div className={classes.btn}>
                    <button type="submit" className={classes.button}>
                      Register
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
