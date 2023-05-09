import React, { useState, useEffect } from "react";
import classes from "./basicInfo.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TfiText } from "react-icons/tfi";
import { TbMap2 } from "react-icons/tb";
import {RxCalendar} from "react-icons/rx";
import axios from "../../../requests/axios";
import routes from "../../../requests/routes";
import ErrorNotification from "../../../generic components/error message/ErrorNotification";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import categoryList from "../../../assets/data/dropDownCategory.js";
import moment from "moment/moment";


/**
 * Component that returns Creator's BAsic Info page
 *
 * @component
 * @example
 * return(<CreatorBasicInfo />)
 */

const CreatorBasicInfo = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [cont, setContinue] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [errorMsg, setErrorMsg] = useState("");
  const [errorLink, setErrorLink] = useState("");
  const [errorLinkMsg, setErrorLinkMsg] = useState("");
  const [stateoftheconditionform, setstateoftheconditionform] = useState(false);
  const [agreeformstate, setagreeformstate] = useState(false);
  const [datainfo, setdatainfo] = useState();

  const initialValues = {
    name: "",
    description: "Hard coded description",
    startDate: "",
    endDate: "",
    summary: "Hard coded summary",
    capacity: 100,
    tickets: [],
    hostedBy: "",
    isPrivate: false,
    venueName: "",
    city: "",
    address1: "",
    country: "",
    postalCode: "",
    category: "",
    image:
      "https://res.cloudinary.com/dv2ei7dxk/image/upload/v1681137937/DEV/ca7lxvsjologe9h46n99.jpg",

    // Not used
    organizer: "",
    Locationpicked: "Venue",
    Datepicked: "Single Event",
    SDCheckbox: false,
    EDCheckbox: false,
    sTime:  "",
    eTime: "",
    address2: "",
    state: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(75).required("Title is required."),
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
    console.log(data);
    try {
      const request = await axios.post(routes.createEvent, data);
      console.log(request);
    } catch (err) {

    }
  }

  const handleSubmit = (data) => {
    console.log(data);
    console.log(user)

    let start = moment(data.startDate).format("YYYY-MM-DD");
    let end = moment(data.endDate).format("YYYY-MM-DD");
    console.log(start+"T"+data.sTime);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("startDate", start+"T"+data.sTime);
    formData.append("endDate", end+"T"+data.eTime);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("summary", data.summary);
    formData.append("venueName", data.venueName);
    formData.append("city", data.city);
    formData.append("address1", data.address1);
    formData.append("country", data.country);
    formData.append("postalCode", data.postalCode);
    formData.append("capacity", data.capacity);

    sendData(formData);
  };

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        {errorMsg ? (
          <ErrorNotification
            mssg={errorMsg}
            linkmsg={errorLinkMsg}
            link={errorLink}
            signUp={true}
          />
        ) : null}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values }) => (
            <Form>
              <div className={classes.headerContainer}>
                <TfiText className={classes.logoImg} />
                <div className={classes.header}>
                  <h1>Basic Info</h1>
                  <p>
                    Name your event and tell event-goers why they should come.
                    Add details that highlight what makes it unique.
                  </p>
                </div>
              </div>
              <div className={classes.boxContainer}>
                <div className={classes.fieldContainer}>
                  <label className={classes.label}>
                    Event Title <p style={{ color: "red" }}> *</p>
                  </label>
                  <Field
                    className={classes.field}
                    id="name"
                    name="name"
                    autoComplete="off"
                    disabled={cont}
                    data-testid="EmailFieldInput"
                    placeholder="Be clear and descriptive"
                  />
                </div>
                <ErrorMessage name="name" component="span" />
              </div>
              <div className={classes.boxContainer}>
                <div className={classes.fieldContainer}>
                  <label className={classes.label}> Organizer</label>
                  <Field
                    className={classes.field}
                    name="organizer"
                    placeholder="Tell attendies who is organzing this event"
                  />
                </div>
              </div>
              <div className={classes.boxContainer} style={{ maxWidth: "20%" }}>
                <div className={classes.fieldContainer}>
                  <label className={classes.label}> Add Category</label>
                  <Field
                    className={classes.field}
                    name="category"
                    component="select"
                  >
                    <option disabled selected value>
                      Select a category
                    </option>
                    {categoryList.map((item) => (
                      <option value={item.title}>{item.title}</option>
                    ))}
                  </Field>
                </div>
                <ErrorMessage name="category" component="span" />
              </div>

              {/* Location */}
              <div className={classes.horizontal} >
                <hr />
              </div>
              <div className={classes.headerContainer}>
                <TbMap2 className={classes.logoImg} />
                <div className={classes.header}>
                  <h1>Location</h1>
                  <p>
                    Help people in the area discover your event and let
                    attendees know where to show up.
                  </p>
                </div>
              </div>
              <div className={classes.btnContainer}>
                <label className={classes.choosebtn}>
                  <Field
                    type="radio"
                    name="Locationpicked"
                    value="Venue"
                  />
                  <p>Venue</p>
                </label>
                <label className={classes.choosebtn}>
                  <Field
                    type="radio"
                    name="Locationpicked"
                    value="Online Events"
                  />
                  <p>Online Events</p>
                </label>
                <label className={classes.choosebtn}>
                  <Field
                    type="radio"
                    name="Locationpicked"
                    value="To be announced"
                  />
                  <p>To be announced</p>
                </label>
              </div>
              {values.Locationpicked === "Online Events" &&
              <div className={classes.header}>
                <p>Online events have unique event pages where you can add links to livestreams and more</p>
              </div>}
              {values.Locationpicked === "Venue" &&
              <>
              <div className={classes.boxContainer}>
                <div className={classes.fieldContainer}>
                  <label className={classes.label}>
                    Venue name <p style={{ color: "red" }}> *</p>
                  </label>
                  <Field
                    className={classes.field}
                    id="venueName"
                    name="venueName"
                    autoComplete="off"
                    disabled={cont}
                    data-testid="EmailFieldInput"
                    placeholder="eg: Madison Square Garden"
                  />
                </div>
                <ErrorMessage name="venueName" component="span" />
              </div>

              <div className={classes.date}>
                <div className={classes.boxContainer} style={{ width: "45%" }}>
                  <div className={classes.fieldContainer}>
                    <label className={classes.label}>
                      Address 1 <p style={{ color: "red" }}> *</p>
                    </label>
                    <Field
                      className={classes.field}
                      id="address1"
                      name="address1"
                      autoComplete="off"
                      disabled={cont}
                      data-testid="EmailFieldInput"
                      placeholder="eg: 155 5th street"
                    />
                  </div>
                  <ErrorMessage name="address1" component="span" />
                </div>

                <div className={classes.boxContainer} style={{ width: "45%" }}>
                  <div className={classes.fieldContainer}>
                    <label className={classes.label}>Address 2</label>
                    <Field
                      className={classes.field}
                      id="address2"
                      name="address2"
                      autoComplete="off"
                      disabled={cont}
                      data-testid="EmailFieldInput"
                      placeholder="eg: Apt, Suite, Bldg (optional)"
                    />
                  </div>
                  <ErrorMessage name="address2" component="span" />
                </div>

                <div className={classes.boxContainer} style={{ width: "45%" }}>
                  <div className={classes.fieldContainer}>
                    <label className={classes.label}>
                      City <p style={{ color: "red" }}> *</p>
                    </label>
                    <Field
                      className={classes.field}
                      id="city"
                      name="city"
                      autoComplete="off"
                      disabled={cont}
                      data-testid="EmailFieldInput"
                      placeholder="eg: New York"
                    />
                  </div>
                  <ErrorMessage name="city" component="span" />
                </div>

                <div
                  className={classes.boxContainer}
                  style={{ width: "17.5%" }}
                >
                  <div className={classes.fieldContainer}>
                    <label className={classes.label}>State/Provision</label>
                    <Field
                      className={classes.field}
                      id="state"
                      name="state"
                      autoComplete="off"
                      disabled={cont}
                      data-testid="EmailFieldInput"
                      placeholder="eg: California"
                    />
                  </div>
                  <ErrorMessage name="state" component="span" />
                </div>
                <div
                  className={classes.boxContainer}
                  style={{ width: "17.5%" }}
                >
                  <div className={classes.fieldContainer}>
                    <label className={classes.label}>
                      Postal code <p style={{ color: "red" }}> *</p>
                    </label>
                    <Field
                      className={classes.field}
                      id="postalCode"
                      name="postalCode"
                      autoComplete="off"
                      disabled={cont}
                      data-testid="EmailFieldInput"
                      placeholder="eg: 9431"
                    />
                  </div>
                  <ErrorMessage name="postalCode" component="span" />
                </div>

                <div className={classes.boxContainer} style={{ width: "45%" }}>
                  <div className={classes.fieldContainer}>
                    <label className={classes.label}>
                      Country <p style={{ color: "red" }}> *</p>
                    </label>
                    <Field
                      className={classes.field}
                      id="country"
                      name="country"
                      autoComplete="off"
                      disabled={cont}
                      data-testid="EmailFieldInput"
                      placeholder="eg: New York"
                    />
                  </div>
                  <ErrorMessage name="country" component="span" />
                </div>
              </div>
              </>}

              {/* Date & Time */}
              <div className={classes.horizontal} >
                <hr />
              </div>
              <div className={classes.headerContainer}>
                <RxCalendar className={classes.logoImg} />
                <div className={classes.header}>
                  <h1>Date and time</h1>
                  <p>
                    Tell event-goers when your event starts and ends so they can
                    make plans to attend.
                  </p>
                </div>
              </div>
              <div className={classes.btnContainer}>
                <label className={classes.choosebtn}>
                  <Field
                    type="radio"
                    name="Datepicked"
                    value="Single Event"
                  />
                  <p>Single Event</p>
                </label>
                <label className={classes.choosebtn}>
                  <Field
                    type="radio"
                    name="Datepicked"
                    value="Reccurring Event"
                  />
                  <p>Reccurring Event</p>
                </label>
              </div>
              <div className={classes.header}>
                {values.Datepicked === "Single Event" ? 
                <p>Single event happens once and can last multiple days</p>
                : <p>You'll be able to set a schedule for your recurring event in the next step. Event details and ticket types will apply to all instances.</p>}
              </div>
              {values.Datepicked === "Single Event" &&
              <div className={classes.date}>
                <div className={classes.boxContainer} style={{ width: "45%" }}>
                  <div className={classes.fieldContainer}>
                    <label className={classes.label}>
                      Start Date <p style={{ color: "red" }}> *</p>
                    </label>
                    <Field
                      className={classes.field}
                      name="startDate"
                      type="date"
                      asp-for="MyDate"
                      asp-format="{0:yyyy-MM-dd}"
                    />
                  </div>
                  <ErrorMessage name="startDate" component="span" />
                </div>

                <div className={classes.boxContainer} style={{ width: "45%" }}>
                  <div className={classes.fieldContainer}>
                    <label className={classes.label}>Start time</label>
                    <Field className={classes.field} name="sTime" type="time" />
                  </div>
                  <ErrorMessage name="sTime" component="span" />
                </div>

                <div className={classes.boxContainer} style={{ width: "45%" }}>
                  <div className={classes.fieldContainer}>
                    <label className={classes.label}>
                      End Date <p style={{ color: "red" }}> *</p>
                    </label>
                    <Field
                      className={classes.field}
                      name="endDate"
                      type="date"
                      asp-for="MyDate"
                      asp-format="{0:yyyy-MM-dd}"
                    />
                  </div>
                  <ErrorMessage name="endDate" component="span" />
                </div>

                <div className={classes.boxContainer} style={{ width: "45%" }}>
                  <div className={classes.fieldContainer}>
                    <label className={classes.label}>End time</label>
                    <Field className={classes.field} name="eTime" type="time" />
                  </div>
                  <ErrorMessage name="eTime" component="span" />
                </div>
              </div>}

              <div className={classes.checkboxContainer}>
                {values.Datepicked === "Single Event" && 
                <div className={classes.checkbox}>
                  <Field
                    type="checkbox"
                    name="SDCheckbox"
                    data-testid="TOSCheckbox"
                  />
                  <label>
                    <h5>Display start time.</h5>
                    The start time of your event will be displayed to attendees.
                  </label>
                </div>}
                <div className={classes.checkbox}>
                  <Field
                    type="checkbox"
                    name="EDCheckbox"
                    data-testid="TOSCheckbox"
                  />
                  <label>
                    <h5>Display end time.</h5>
                    The end time of your event will be displayed to attendees.
                  </label>
                </div>
              </div>
              
              <div className={classes.horizontal} >
                <hr />
              </div>
              <div className={classes.btn} style={{ margin: "2rem auto" }}>
                <button
                  type="submit"
                  className={classes.button}
                  data-testid="CreateBtn"
                >
                  Save & Continue
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreatorBasicInfo;
