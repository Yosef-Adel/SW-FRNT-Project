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

/**
 * Component that returns Creator's Publish Event page
 *
 * @component
 * @example
 * return(<CreatorPublish />)
 */
const CreatorPublish = () => {
  const initialValues = {
    isPrivate: "1",
    publishDate: "1",
    starttime: "",
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
    <div className={classes.container}>
      <div className={classes.publish}>
        <h1 className={classes.header}>Publish Your Event</h1>
        <CreatorEventCard
          image={image}
          title="Rana Trial"
          date="Monday, June 12, 2023 at 7:00 PM EET"
          type="Online Event"
          tickets="15"
          followers="120"
        />
        <div className={classes.section2}>
          <Formik className={classes.form} initialValues={initialValues}>
            <Form>
              <div className={classes.boxContainer}>
                <div className={classes.fieldContainer} role="group">
                  <p className={classes.fieldTitle}>Who can see your event?</p>
                  <label>
                    <Field type="radio" name="isPrivate" value="1" />
                    Public
                    <p>Shared on Eventbrite and search engines</p>
                  </label>
                  <label>
                    <Field type="radio" name="isPrivate" value="2" />
                    Private
                    <p>Only available to a selected audience</p>
                  </label>
                </div>

                <div className={classes.fieldContainer} role="group">
                  <p className={classes.fieldTitle}>
                    When should we publish your event?
                  </p>
                  <label>
                    <Field type="radio" name="publishDate" value="1" />
                    Publish Now
                  </label>
                  <label>
                    <Field type="radio" name="publishDate" value="2" />
                    Schedule for later
                  </label>
                </div>

                <div className={classes.containerstart}>
                  <div className={classes.datacontainer}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={[]}>
                        <DemoItem>
                          <DatePicker
                            defaultValue={dayjs("2022-04-17")}
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

                  <div className={classes.fieldContainer}>
                    <label className={classes.label}>Start time</label>
                    <Field
                      className={classes.field}
                      name="starttime"
                      component="select"
                    >
                      <option>12:00 AM</option>
                      <option>12:30 AM</option>
                      <option>1:00 AM</option>
                      <option>1:30 AM</option>
                      <option>2:00 AM</option>
                      <option>2:30 AM</option>
                      <option>3:00 AM</option>
                      <option>3:30 AM</option>
                      <option>4:00 AM</option>
                      <option>4:30 AM</option>
                      <option>5:00 AM</option>
                      <option>5:30 AM</option>
                      <option>6:00 AM</option>
                      <option>6:30 AM</option>
                      <option>7:00 AM</option>
                      <option>7:30 AM</option>
                      <option>8:00 AM</option>
                      <option>8:30 AM</option>
                      <option>9:00 AM</option>
                      <option>9:30 AM</option>
                      <option>10:00 AM</option>
                      <option>10:30 AM</option>
                      <option>11:00 AM</option>
                      <option>11:30 AM</option>
                      <option>12:00 PM</option>
                      <option>12:30 PM</option>
                      <option>1:00 PM</option>
                      <option>1:30 PM</option>
                      <option>2:00 PM</option>
                      <option>2:30 PM</option>
                      <option>3:00 PM</option>
                      <option>3:30 PM</option>
                      <option>4:00 PM</option>
                      <option>4:30 PM</option>
                      <option>5:00 PM</option>
                      <option>5:30 PM</option>
                      <option>6:00 PM</option>
                      <option>6:30 PM</option>
                      <option>7:00 PM</option>
                      <option>7:30 PM</option>
                      <option>8:00 PM</option>
                      <option>8:30 PM</option>
                      <option>9:00 PM</option>
                      <option>9:30 PM</option>
                      <option>10:00 PM</option>
                      <option>10:30 PM</option>
                      <option>11:00 PM</option>
                      <option>11:30 PM</option>
                    </Field>
                  </div>
                </div>
              </div>
            </Form>
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

        <div className={classes.footer}>
          <hr></hr>
          <button className={classes.btn}>Publish</button>
        </div>
      </div>
    </div>
  );
};

export default CreatorPublish;
