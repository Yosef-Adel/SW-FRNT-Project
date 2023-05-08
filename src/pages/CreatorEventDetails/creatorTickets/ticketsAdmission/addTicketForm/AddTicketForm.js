import classes from "./addTicketForm.module.css";
import GenericFilterTabs from "../../../../../generic components/generic filter/GenericFilterTabs";
import TicketsFilterTabs from "../../../../../assets/data/TicketsFilterTabs";
import Drawer from "@mui/material/Drawer";
import { useState, useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Checkbox from "@mui/material/Checkbox";
const AddTicketForm = () => {
  const initialValues = {
    name: "General Admission",
    availablequantity: "",
    price: "",
    salesstart: null,
    salesend: null,
    starttime: "",
    endtime: "",
    minimumquantity: "1",
    maximumquantity: "1",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(50, "Name must be at most 50 characters")

      .required("Please enter a name"),
    availablequantity: Yup.string().required("Quantity is required"),
    price: Yup.string().required("  Price is required to make a paid ticket"),
  });
  const [advancedopen, setadvancedopen] = useState(false);
  function handleclick2() {
    setadvancedopen(!advancedopen);
  }
  const [value, setValue] = React.useState(dayjs("2022-04-17"));

  const [state, setState] = React.useState({
    right: false,
  });
  const [paidclicked, setpaidClicked] = useState(true);
  const [freeclicked, setfreeClicked] = useState(false);
  const [donationclicked, setdonationClicked] = useState(false);
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  function handlepaidclicked() {
    setfreeClicked(false);
    setpaidClicked(true);
    setdonationClicked(false);
  }
  function handledonationclicked() {
    setfreeClicked(false);
    setpaidClicked(false);
    setdonationClicked(true);
  }
  function handlefreeclicked() {
    setfreeClicked(true);
    setpaidClicked(false);
    setdonationClicked(false);
    console.log(freeclicked);
  }
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const handleSubmit = (data, { setErrors }) => {};

  return (
    <div>
      <div className={classes.btn}>
        <Button
          className={classes.button}
          onClick={toggleDrawer("right", true)}
          data-testid="AddTicketButton"
        >
          Add Ticket
        </Button>
      </div>
      <SwipeableDrawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
        BackdropProps={{
          invisible: true,
        }}
        PaperProps={{
          style: {
            height: "calc(100% - 60px)",
            marginTop: 60,
            marginRight: 20,
          },
        }}
      >
        <Box className={classes.box} sx={{ width: 420, height: "100%" }}>
          <div className={classes.headercontainer}>
            <p className={classes.ticketp}>Add tickets</p>
            <a>Learn more</a>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form className={classes.form}>
                <div className={classes.forminfo}>
                  <div className={classes.typeofform}>
                    <div
                      onClick={handlepaidclicked}
                      className={
                        paidclicked ? classes.clickeditem : classes.item
                      }
                    >
                      Paid
                    </div>
                    <div
                      onClick={handlefreeclicked}
                      className={
                        freeclicked ? classes.clickeditem : classes.item
                      }
                    >
                      Free
                    </div>
                    <div
                      onClick={handledonationclicked}
                      className={
                        donationclicked ? classes.clickeditem : classes.item
                      }
                    >
                      Donation
                    </div>
                  </div>
                  <div className={classes.boxContainer}>
                    <div className={classes.fieldContainer}>
                      <label className={classes.label}>Name</label>
                      <Field
                        className={classes.field}
                        name="name"
                        type="text"
                        autoComplete="off"
                        data-testid="LoginFormEmailInput"
                        placeholder="General Admission"
                      />
                    </div>
                    <ErrorMessage name="name" component="span" />
                  </div>

                  <div className={classes.boxContainer}>
                    <div className={classes.fieldContainer}>
                      <label className={classes.label}>
                        Available quantity
                      </label>
                      <Field
                        className={classes.field}
                        name="availablequantity"
                        autoComplete="off"
                        type="number"
                      />
                    </div>
                    <ErrorMessage name="availablequantity" component="span" />
                  </div>
                  <div className={classes.boxContainer}>
                    <div
                      className={
                        freeclicked || donationclicked
                          ? classes.fielddisable
                          : classes.fieldContainer
                      }
                    >
                      <label
                        className={classes.label}
                        style={{ paddingLeft: "20px" }}
                      >
                        Price
                      </label>
                      <div className={classes.container2}>
                        <p className={classes.dollar}>$</p>
                        <Field
                          disabled={freeclicked || donationclicked}
                          className={classes.field}
                          name="price"
                          placeholder="0.00"
                          type="number"
                        />
                      </div>
                    </div>
                    {paidclicked ? (
                      <>
                        <ErrorMessage name="price" component="span" />
                      </>
                    ) : null}
                  </div>
                  <div className={classes.boxContainer}>
                    <div className={classes.fieldContainer}>
                      <label className={classes.label}>
                        When are tickets available?
                      </label>
                      <Field
                        className={classes.field}
                        name="ticketavailable"
                        component="select"
                      >
                        <option>Data & time</option>
                        <option>When sales end for...</option>
                      </Field>
                    </div>
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

                    <div className={classes.boxContainer}>
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
                                "& .MuiPickersCalendar-root": {
                                  fontSize: 14,
                                },
                              }}
                            />
                          </DemoItem>
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>
                    <div className={classes.boxContainer}>
                      <div className={classes.fieldContainer}>
                        <label className={classes.label}>End time</label>
                        <Field
                          className={classes.field}
                          name="endtime"
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
                  <div className={classes.advancedsettings}>
                    <div className={classes.advancedp}>Advanced settings</div>
                    <div
                      onClick={handleclick2}
                      className={
                        advancedopen ? classes.icondown : classes.iconup
                      }
                    >
                      <ArrowBackIosNewIcon />
                    </div>
                  </div>
                  {advancedopen ? (
                    <>
                      <div className={classes.containercheckbutton}>
                        <div className={classes.checkbutton}>
                          <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ "aria-label": "controlled" }}
                            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                          />
                        </div>
                        <div className={classes.checkbuttonp}>
                          Show tickets sale end dates and sale status at
                          checkout
                        </div>
                      </div>
                      <div className={classes.boxContainer}>
                        <div className={classes.fieldContainer}>
                          <label className={classes.label}>desciption</label>
                          <Field
                            className={classes.field}
                            name="desciption"
                            placeholder="Tell attendess more about this ticket"
                          />
                        </div>
                      </div>
                      <div className={classes.boxContainer}>
                        <div className={classes.fieldContainer}>
                          <label className={classes.label}>Start time</label>
                          <Field
                            className={classes.field}
                            name="starttime"
                            component="select"
                          >
                            <option>Visible</option>
                            <option>Hidden</option>
                            <option>Hidden when not on sale</option>
                            <option>Custom schedule</option>
                          </Field>
                        </div>
                      </div>
                      <div className={classes.ticketperorder}>
                        Tickets per order
                      </div>
                      <div className={classes.containerstart}>
                        <div className={classes.boxContainer}>
                          <div
                            className={classes.fieldContainer}
                            style={{ width: "77%" }}
                          >
                            <label className={classes.label}>
                              Minimum quantity
                            </label>
                            <Field
                              className={classes.field}
                              name="minimumquantity"
                            ></Field>
                          </div>
                        </div>

                        <div className={classes.boxContainer}>
                          <div
                            className={classes.fieldContainer}
                            style={{ width: "77%" }}
                          >
                            <label className={classes.label}>
                              Maximum quantity
                            </label>
                            <Field
                              className={classes.field}
                              name="maximumquantity"
                            ></Field>
                          </div>
                        </div>
                      </div>
                      <div
                        className={classes.boxContainer}
                        style={{ marginBottom: "5rem" }}
                      >
                        <div className={classes.fieldContainer}>
                          <label className={classes.label}>Sales channel</label>
                          <Field
                            className={classes.field}
                            name="saleschannel"
                            component="select"
                          >
                            <option>Online only</option>
                          </Field>
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
                <div className={classes.leavecheckoutbuttons}>
                  <div className={classes.stayleavebtn}>
                    <button
                      className={classes.staybutton}
                      onClick={toggleDrawer("right", false)}
                    >
                      Cancel
                    </button>
                  </div>

                  <div className={classes.stayleavebtn}>
                    <button type="submit" className={classes.leavebutton}>
                      Save
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
      </SwipeableDrawer>
    </div>
  );
};

export default AddTicketForm;
