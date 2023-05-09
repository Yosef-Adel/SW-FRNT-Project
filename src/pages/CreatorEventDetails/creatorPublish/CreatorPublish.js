import classes from "./publish.module.css";
import CreatorEventCard from "./eventCard/CreatorEventCard";
import image from "../../../assets/imgs/events/event1.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import axios from "../../../requests/axios";
import routes from "../../../requests/routes";
import moment from "moment/moment";
import { useSelector } from "react-redux";

/**
 * Component that returns Creator's Publish Event page
 *
 * @component
 * @example
 * return(<CreatorPublish />)
 */
const CreatorPublish = () => {
  const event = useSelector((state) => state.event);

  const [disable, setDisable] = useState(true);
  const [buttonContent, setButtonContent] = useState("Publish");

  // const [radioContent, setRadioContent] = useState("Publish");

  const initialValues = {
    isPrivate: "false",
    isScheduled: "false",
    isPublished: "false",
    publishDate: "1",
    starttime: "",
    password:"",
    link: "link",
  };

  async function publishData(data) {
    console.log(data);
    console.log(event.eventId)
    try {
      const request = await axios.put(routes.createEvent + "/" + event.eventId, data);
      console.log(request);
    } catch (err) {}
  }

  const handleSubmit = (data) => {
    // console.log(data);

    let start = moment(data.publishDate).format("YYYY-MM-DD");
    console.log(start + "T" + data.sTime);
    const formData = new FormData();
    formData.append("isPrivate", data.isPrivate === "true");
    formData.append("isScheduled", data.isScheduled === "true");
    formData.append("isPublished", data.isScheduled === "false" && data.isPrivate === "false");
    //if published event
    if(!(data.isScheduled === "false" && data.isPrivate === "false")) formData.append("publishDate", start + "T" + data.starttime);
    if(data.link === "pass") formData.append("password", data.password);
    publishData(formData);
  };

  const tipsIcon = (
    <svg viewBox="0 0 24 24">
      <path
        d="M15 22.5H9v-2h6zm0-4H9v-3.67a7 7 0 1 1 6 0zm-4-2h2v-3.05l.67-.24a5 5 0 1 0-3.34 0l.67.23z"
        fill="#39364f"
      ></path>
    </svg>
  );
  const arrowIcon = (
    <svg
      class="arrow-right-chunky_svg__eds-icon--arrow-right-chunky_svg"
      viewBox="0 0 24 24"
    >
      <path
        class="arrow-right-chunky_svg__eds-icon--arrow-right-chunky_base"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.5 5.5L16 11H4v2h12l-5.5 5.5L12 20l8-8-8-8z"
      ></path>
    </svg>
  );
  return (
    <>
      <div className={classes.container}>
        <div className={classes.publish}>
          <h1 className={classes.header}>Publish Your Event</h1>
          <CreatorEventCard
            image={event.image}
            title={event.eventTitle}
            date={event.startDate}
            type={!event.isOnline? event.venueName : "Online Event"}
            tickets={event.tickets.length}
            followers="120"
          />
          <div className={classes.section2}>
            <Formik
              className={classes.form}
              initialValues={initialValues}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ values }) => (
                <Form>
                  <div className={classes.boxContainer}>
                    <div className={classes.fieldContainer} role="group">
                      <p className={classes.fieldTitle}>
                        Who can see your event?
                      </p>
                      <label>
                        <Field type="radio" name="isPrivate" value="false" />
                        <span>
                          Public
                          <p className={classes.fieldDesc}>
                            Shared on Eventbrite and search engines
                          </p>
                        </span>
                      </label>

                      <label>
                        <Field type="radio" name="isPrivate" value="true" />
                        <span>
                          Private
                          <p className={classes.fieldDesc}>
                            Only available to a selected audience
                          </p>
                        </span>
                      </label>
                    </div>

                    {values.isPrivate === "true" && (
                      <>
                        <div className={classes.fieldContainer}>
                          <p className={classes.fieldTitle}>
                            Choose your audience
                          </p>
                          <label className={classes.dropDown} role="group">
                            <span className={classes.span}>Audience</span>
                            <Field
                              className={classes.field}
                              name="link"
                              component="select"
                            >
                              <option value="link">Anyone with link</option>
                              <option value="pass">
                                Only people with password
                              </option>
                            </Field>
                          </label>
                        </div>
                        {values.link === "pass" && (
                          <div className={classes.boxContainerInput}>
                            <div className={classes.fieldContainerInput}>
                              <label className={classes.label}>Password</label>
                              <Field
                                className={classes.field}
                                name="password"
                                placeholder="password"
                              />
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    <div className={classes.fieldContainer} role="group">
                      {values.isPrivate === "true" ? (
                        <>
                          <p className={classes.fieldTitle}>
                            When should we publish your event?
                          </p>
                          <label>
                            <Field
                              type="radio"
                              name="isScheduled"
                              value="false"
                              onClick={() => {
                                setDisable(true);
                                setButtonContent("Publish");
                              }}
                            />
                            No, keep it private
                          </label>
                          <label>
                            <Field
                              type="radio"
                              name="isScheduled"
                              value="true"
                              onClick={() => {
                                setDisable(false);
                                setButtonContent("Schedule");
                              }}
                            />
                            Yes, schedule to share publicly
                          </label>
                        </>
                      ) : (
                        <>
                          <p className={classes.fieldTitle}>
                            Will this event ever be public?
                          </p>
                          <label>
                            <Field
                              type="radio"
                              name="isScheduled"
                              value="false"
                              onClick={() => {
                                setDisable(true);
                                setButtonContent("Publish");
                              }}
                            />
                            Publish Now
                          </label>
                          <label>
                            <Field
                              type="radio"
                              name="isScheduled"
                              value="true"
                              onClick={() => {
                                setDisable(false);
                                setButtonContent("Schedule");
                              }}
                            />
                            Schedule for later
                          </label>
                        </>
                      )}
                    </div>

                    <div className={classes.containerstart}>
                      <div className={classes.datacontainer}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={[]}>
                            <DemoItem>
                              <DatePicker
                                className={`${disable && classes.disabled}`}
                                defaultValue={dayjs("2022-04-17")}
                                disabled={disable}
                                name="publishDate"
                                sx={{
                                  "& .MuiInputBase-input": {
                                    height: "17px",
                                    fontSize: 13,
                                    paddingBottom: "18px",
                                    paddingTop: "18px",
                                  },
                                }}
                              />
                            </DemoItem>
                          </DemoContainer>
                        </LocalizationProvider>
                      </div>

                      <div
                        className={`${classes.fieldContainerDate} ${
                          disable && classes.disabled
                        } ${disable && classes.disabledBorder}`}
                      >
                        <label className={classes.label}>Start time</label>
                        <Field
                          className={classes.field}
                          name="starttime"
                          type="time"
                          disabled={disable}
                        ></Field>
                      </div>
                    </div>
                  </div>
                  <div className={classes.footer}>
                    <hr></hr>
                    <button type="submit" className={classes.btn}>
                      {buttonContent}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            <div className={classes.tips}>
              <h3 className={classes.tipsHeader}>
                {tipsIcon} Tips before you publish
              </h3>
              <div className={classes.options}>
                <p>Create promo codes for your event {arrowIcon}</p>
                <p>Customize your order form {arrowIcon}</p>
                <p>Manage how you get paid {arrowIcon}</p>
                <p>Set your refund policy {arrowIcon}</p>
                <p>
                  Add this event to a collection to increase visibility{" "}
                  {arrowIcon}
                </p>
                <p>Develop a safety plan for your event {arrowIcon}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatorPublish;
