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
import Time from "../../../../../assets/data/TimeOptions";
import moment from "moment";
import axios from "../../../../../requests/axios";
import routes from "../../../../../requests/routes";
import { useSelector } from "react-redux";

const AddTicketForm = ({ ticket, setdummydata }) => {
  const initialValues = {
    name: "General Admission",
    availablequantity: "",
    price: "",
    ticketoption: "",
    salesstart: "2022-04-17",
    salesend: "2022-04-17",
    starttime: "12:00 AM",
    endtime: "12:00 AM",
    minimumquantity: "1",
    maximumquantity: "1",
    description: "",
    Visibility: "",
  };

  function handleKeyPress(event) {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);

    // Only allow numeric values
    if (/[^0-9]/.test(keyValue)) {
      event.preventDefault();
    }
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(50, "Name must be at most 50 characters")

      .required("Name is required."),
    availablequantity: Yup.number()
      .min(1, "Quantity must be between 1 and 500,000")
      .max(500000, "Quantity must be between 1 and 500,000")
      .required("Quantity is required"),
    price: Yup.number()
      .max(1000000, "Price must be less than $1,000,000")
      .min(1, "Price must be greater than 0")
      .required("  Price is required to make a paid ticket"),
    //salesend: Yup.date().min(new Date(), "End date cannot be in the past."),
  });
  const [advancedopen, setadvancedopen] = useState(false);
  function handleclick2() {
    setadvancedopen(!advancedopen);
  }
  const event = useSelector((state) => state.event);
  const [value, setValue] = React.useState(dayjs("2022-04-17"));

  const [state, setState] = React.useState({
    right: false,
  });
  const [paidclicked, setpaidClicked] = useState(true);
  const [freeclicked, setfreeClicked] = useState(false);
  const [donationclicked, setdonationClicked] = useState(false);
  const [checked, setChecked] = React.useState(true);
  const [datetime, SetDatetime] = useState(true);

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
  function handlechangetimeorsalesend(e) {
    if (e.target.value === "Data & time") {
      SetDatetime(true);
    } else {
      SetDatetime(false);
    }
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
  async function addevent(data) {
    try {
      const response = await axios.post(
        routes.tickets + "/" + event.eventId + "/createTicket",
        data
      );
      setdummydata(false);

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  const handleSubmit = (data, { setErrors }) => {
    //console.log(data);

    let datasent = data;
    let sDate = new Date(data.salesend + " " + data.endtime);
    let endDate1 = sDate.toISOString();
    datasent.salesEnd = endDate1;
    datasent.event = event.eventId;
    if (paidclicked) {
      datasent.type = "paid";
      datasent.price = Number(data.price);
    } else {
      datasent.type = "free";
    }
    delete datasent.salesend;
    delete datasent.Visibility;
    delete datasent.endtime;

    if (datetime) {
      let sDate2 = new Date(data.salesstart + " " + data.starttime);
      let startDate2 = sDate2.toISOString();
      console.log(startDate2);
      datasent.salesStart = startDate2;
    } else {
      let tickets = ticket[Number(datasent.ticketoption)].salesEnd;
      console.log(ticket);
      datasent.salesStart = tickets;
    }
    datasent.capacity = Number(data.availablequantity);
    datasent.fee = 2.5;
    datasent.sold = 0;
    datasent.minQuantityPerOrder = data.minimumquantity;
    datasent.maxQuantityPerOrder = data.maximumquantity;
    delete datasent.minimumquantity;
    delete datasent.maximumquantity;
    delete datasent.availablequantity;
    delete datasent.salesstart;
    delete datasent.starttime;
    delete datasent.ticketoption;
    console.log(datasent);
    addevent(datasent);
  };

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
                        placeholder="Ticket name"
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
                        onKeyPress={handleKeyPress}
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
                          onKeyPress={handleKeyPress}
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
                        onChange={handlechangetimeorsalesend}
                      >
                        <option>Data & time</option>
                        <option>When sales end for...</option>
                      </Field>
                    </div>
                  </div>

                  {datetime ? (
                    <>
                      <div className={classes.containerstart}>
                        <div className={classes.datacontainer}>
                          <label className={classes.salesstart}>
                            Sales start
                          </label>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={[]}>
                              <DemoItem>
                                <DatePicker
                                  defaultValue={dayjs("2022-04-17")}
                                  onChange={(date) => {
                                    setFieldValue(
                                      "salesstart",
                                      moment(date.$d, "YYYY-MM-DD").format(
                                        "YYYY-MM-DD"
                                      )
                                    ); // Update formik state directly
                                  }}
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
                              {Time.options.map((item, index) => {
                                return (
                                  <option
                                    key={"AddPromoCodeStartTime" + index}
                                    id={"AddPromoCodeStartTime" + index}
                                    value={item}
                                  >
                                    {item}
                                  </option>
                                );
                              })}
                            </Field>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className={classes.boxContainer}>
                      <div className={classes.fieldContainer}>
                        <label className={classes.label}>Ticket options</label>
                        <Field
                          className={classes.field}
                          name="ticketoption"
                          component="select"
                        >
                          {ticket.map((Element, index) => {
                            return (
                              <option value={index}>{Element.name}</option>
                            );
                          })}
                        </Field>
                      </div>
                    </div>
                  )}
                  <div className={classes.containerstart}>
                    <div className={classes.datacontainer}>
                      <label className={classes.salesend}>Sales end</label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={[]}>
                          <DemoItem className={classes.DemoContainer}>
                            <DatePicker
                              defaultValue={dayjs("2022-04-17")}
                              onChange={(date) => {
                                setFieldValue(
                                  "salesend",
                                  moment(date.$d, "YYYY-MM-DD").format(
                                    "YYYY-MM-DD"
                                  )
                                );
                              }}
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
                          {Time.options.map((item, index) => {
                            return (
                              <option
                                key={"AddPromoCodeStartTime" + index}
                                id={"AddPromoCodeStartTime" + index}
                                value={item}
                              >
                                {item}
                              </option>
                            );
                          })}
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
                        <div
                          className={classes.fieldContainer}
                          style={{ paddingBottom: "4.5rem" }}
                        >
                          <label className={classes.label}>desciption</label>
                          <Field
                            className={classes.field}
                            name="description"
                            placeholder="Tell attendess more about this ticket"
                          />
                        </div>
                      </div>
                      <div className={classes.boxContainer}>
                        <div className={classes.fieldContainer}>
                          <label className={classes.label}>Visibility</label>
                          <Field
                            className={classes.field}
                            name="Visibility"
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
                              onKeyPress={handleKeyPress}
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
                              onKeyPress={handleKeyPress}
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
