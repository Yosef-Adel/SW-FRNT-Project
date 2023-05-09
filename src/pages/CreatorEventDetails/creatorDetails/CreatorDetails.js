import React, { useState, useEffect } from "react";
import classes from "./creatorDetails.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TfiText } from "react-icons/tfi";
import { CgDetailsMore } from "react-icons/cg";
import { CiImageOn } from "react-icons/ci";
import axios from "../../../requests/axios";
import routes from "../../../requests/routes";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { eventActions } from "../../../store/eventSlice";

/**
 * Component that returns Creator's Event details page
 *
 * @component
 * @example
 * return(<CreatorDetails />)
 */

const CreatorDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const event = useSelector((state) => state.event);
  const [uploadImg, setUploadImg] = useState()

  const initialValues = {
    description: event.description,
    summary: event.summary,
    image: event.image,
  };

  const validationSchema = Yup.object().shape({
    
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

  async function sendData(data) {
    // console.log(data);
    try {
      const request = await axios.put(routes.updateEvent + event.eventId, data);
      console.log(request.data);
      dispatch(
        eventActions.updateDetails({
          image: request.data.image,
          summary: request.data.summary,
          description: request.data.description,
        })
      );
    } catch (err) {}
  }

  let img = document.getElementById("img");
  let input = document.getElementById("input");

  useEffect(() => {
    input = document.getElementById("input");

    if(input){
      input.onchange= (e)=>{
        if (input.files[0])
        {
          img = document.getElementById("img");
          img.src = URL.createObjectURL(input.files[0]);
          setUploadImg(input.files[0])
        }
      }
    }

  },[input])

  const handleSubmit = (data) => {
    // console.log(data);
    // console.log(uploadImg)
    const formData = new FormData();
    if(uploadImg){
      formData.append("image", uploadImg);
    }
    if(data.summary){
      formData.append("summary", data.summary);
    }
    if(data.description){
      formData.append("description", data.description);
    }

    sendData(formData);
  };

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values }) => (
            <Form>
              {/* Event media */}
              <div className={classes.headerContainer}>
                <CiImageOn className={classes.logoImg} />
                <div className={classes.header}>
                  <h1>Event media</h1>
                  <p>
                    Images Add photos to show what your event will be about. You
                    can upload up to 10 images.
                  </p>
                </div>
              </div>
              <div className={classes.imageContainer}>
                <img id="img" src={event.image}/>
              </div>
              <div className={classes.uploadBtn}>
                <input id="input" type="file" className={classes.customfileinput}/>
              </div>

              {/* Event summary */}
              <div className={classes.horizontal}>
                <hr />
              </div>
              <div className={classes.headerContainer}>
                <TfiText className={classes.logoImg} />
                <div className={classes.header}>
                  <h1>Summary</h1>
                  <p>
                    Grab people's attention with a short description about your
                    event. Attendees will see this at the top of your event
                    page. (140 characters max) See examples
                  </p>
                </div>
              </div>
              <div className={classes.boxContainer}>
                <div className={classes.fieldContainer}>
                  <label className={classes.label}>
                    Summary <p style={{ color: "red" }}> *</p>
                  </label>
                  <Field
                    className={classes.field}
                    id="summary"
                    name="summary"
                  />
                </div>
                <ErrorMessage name="summary" component="span" />
              </div>

              {/* Description */}
              <div className={classes.horizontal}>
                <hr />
              </div>
              <div className={classes.headerContainer}>
                <CgDetailsMore className={classes.logoImg} />
                <div className={classes.header}>
                  <h1>Description</h1>
                  <p>
                    Add more details to your event like your schedule, sponsors,
                    or featured guests. Learn more
                  </p>
                </div>
              </div>

              <div className={classes.boxContainer}>
                <div className={classes.fieldContainer}>
                  <Field
                    as="textarea"
                    className={classes.field}
                    id="description"
                    name="description"
                  />
                </div>
                <ErrorMessage name="description" component="span" />
              </div>

              <div className={classes.horizontal}>
                <hr />
              </div>
              <div className={classes.btn} style={{ margin: "2rem auto" }}>
                <button
                  type="submit"
                  className={classes.button}
                  data-testid="CreateBtn"
                >
                  Update
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreatorDetails;
