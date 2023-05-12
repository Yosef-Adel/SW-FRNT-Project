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
import CircularProgress from "@mui/material/CircularProgress";
import GenericModal from "../../../../../generic components/generic modal/GenericModal";
import { TiTick } from "react-icons/ti";
import ErrorNotification from "../../../../../generic components/error message/ErrorNotification";

const AddTicketForm = ({ ticket, setdummydata, isempty, isloading }) => {
  const initialValues = {
    name: "General Admission",
    availablequantity: "",
    price: "",
    ticketoption: "",
    salesstart: "2023-05-25",
    salesend: "2023-05-27",
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

  const getValidationSchema = () => {
    let schema = Yup.object().shape({
      name: Yup.string()
        .max(50, "Name must be at most 50 characters")

        .required("Name is required."),
      availablequantity: Yup.number()
        .min(1, "Quantity must be between 1 and 500,000")
        .max(500000, "Quantity must be between 1 and 500,000")
        .required("Quantity is required"),
    });
    if (paidclicked) {
      schema = schema.shape({
        price: Yup.number()
          .max(1000000, "Price must be less than $1,000,000")
          .min(1, "Price must be greater than 0")
          .required("  Price is required to make a paid ticket"),
      });
    }

    //salesend: Yup.date().min(new Date(), "End date cannot be in the past."),
  };
  const [advancedopen, setadvancedopen] = useState(false);
  function handleclick2() {
    setadvancedopen(!advancedopen);
  }
  const event = useSelector((state) => state.event);
  const [value, setValue] = React.useState(dayjs("2022-04-17"));
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorLink, setErrorLink] = useState("");
  const [errorLinkMsg, setErrorLinkMsg] = useState("");
  const [state, setState] = React.useState({
    right: false,
  });
  const [paidclicked, setpaidClicked] = useState(true);
  const [freeclicked, setfreeClicked] = useState(false);
  const [donationclicked, setdonationClicked] = useState(false);
  const [checked, setChecked] = React.useState(true);
  const [datetime, SetDatetime] = useState(true);
  const [loading, setloading] = useState(false);
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
      setloading(true);
      const response = await axios.post(
        routes.tickets + "/" + event.eventId + "/createTicket",
        data
      );
      setdummydata(false);
      toggleDrawer("right", false);
      setloading(false);

      console.log(response.data);
    } catch (err) {
      console.log(err);
      setloading(false);
      setErrorMsg(err.response.data.message);
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
      datasent.type = "Paid";
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
    // Formik.resetForm();
  };
  function handlecancel() {
    console.log("ay7agaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    toggleDrawer("right", false);
  }

  return (
    <div>
      {!isloading && (
        <div>
          {isempty ? (
            <div className={classes.emptypromos}>
              <div className={classes.emptyticketsicon}>
                <svg viewBox="0 0 144 144">
                  <g fill="none" fill-rule="evenodd">
                    <g>
                      <path d="M0 0h144v144H0z"></path>
                      <path
                        d="M27 84v-.6c0-4.5 4.05-8.25 8.85-8.25 4.95 0 9.15 4.2 9.15 8.55v.3h3V42h42c.6 4.35 4.2 7.5 8.85 7.5 4.65 0 8.25-3.15 8.85-7.5h7.8v51h-7.8c-.6-4.35-4.2-7.5-8.85-7.5-4.65 0-8.25 3.15-8.85 7.5H35.85c-4.95 0-8.7-3-8.85-9z"
                        fill="#D2D6DF"
                        fill-rule="nonzero"></path>
                      <path
                        fill="#363A43"
                        fill-rule="nonzero"
                        d="M81 103h6v3h-6zM99 103h6v3h-6zM107 103h6v3h-6zM72 103h6v3h-6zM90 103h6v3h-6zM63 103h6v3h-6zM54 102.9h6v3h-6zM45 102.9h6v3h-6zM36 102.9h6v3h-6zM36 94h3v6h-3zM110 94h3v6h-3z"></path>
                      <path
                        d="M24 84.45c0 6.6 5.25 11.7 11.85 11.7H93v-1.5c0-3.45 2.55-6 6-6s6 2.55 6 6v1.5h13.5v-57H105v1.5c0 3.45-2.55 6-6 6s-6-2.55-6-6v-1.5H47.7c-1.05-5.7-5.85-9.9-11.7-9.9-6.75 0-12 5.4-12 12.15v43.05zM45 41.4v35.4c-3-2.7-5.55-4.35-9.15-4.35-3.6 0-7.35 1.65-8.85 4.05V41.25c0-5.1 3.9-9.15 9-9.15s9 4.2 9 9.3zM27 84v-.6c0-4.5 4.05-8.25 8.85-8.25 4.95 0 9.15 4.2 9.15 8.55v.3h3V42h42c.6 4.35 4.2 7.5 8.85 7.5 4.65 0 8.25-3.15 8.85-7.5h7.8v51h-7.8c-.6-4.35-4.2-7.5-8.85-7.5-4.65 0-8.25 3.15-8.85 7.5H35.85c-4.95 0-8.7-3-8.85-9z"
                        fill="#363A43"
                        fill-rule="nonzero"></path>
                      <path
                        d="M45 41.4v35.4c-3-2.7-5.55-4.35-9.15-4.35-3.6 0-7.35 1.65-8.85 4.05V41.25c0-5.1 3.9-9.15 9-9.15s9 4.2 9 9.3z"
                        fill="#FFF"
                        fill-rule="nonzero"></path>
                      <path
                        fill="#363A43"
                        fill-rule="nonzero"
                        d="M97.35 70.8h3v3h-3zM97.35 64.8h3v3h-3zM97.35 76.8h3v3h-3zM97.35 58.8h3v3h-3zM97.35 52.8h3v3h-3z"></path>
                      <path
                        fill="#3A3A3A"
                        fill-rule="nonzero"
                        d="M54 58.8h37.5v3H54zM54 64.8h15v3H54z"></path>
                    </g>
                  </g>
                </svg>
              </div>
              <div className={classes.emptypromossec}>
                <div
                  id="CreatorticketsPagepromocodesHeader"
                  className={classes.mainsectionheader}>
                  Let's Create Tickets
                </div>
                <div className={classes.emptypromosumm}>
                  Create a section if you want to sell multiple ticket types
                  that share the same inventory. i.e. Floor, Mezzanine.
                </div>
              </div>
              <div className={classes.btn}>
                <Button
                  className={classes.button}
                  onClick={toggleDrawer("right", true)}
                  data-testid="AddTicketButton">
                  Add Ticket
                </Button>
              </div>
            </div>
          ) : (
            <div className={classes.btn}>
              <Button
                className={classes.button}
                onClick={toggleDrawer("right", true)}
                data-testid="AddTicketButton">
                Add Ticket
              </Button>
            </div>
          )}
        </div>
      )}

      <SwipeableDrawer
        anchor={"right"}
        open={state["right"]}
        //onClose={toggleDrawer("right", false)}
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
        }}>
        <Box className={classes.box} sx={{ width: 420, height: "100%" }}>
          <div className={classes.headercontainer}>
            <p className={classes.ticketp}>Add tickets</p>
            <a>Learn more</a>
          </div>
          {loading ? (
            <>
              <div className={classes.loading}>
                <CircularProgress color="success" size={80} />
              </div>
            </>
          ) : (
            <>
              <Formik
                initialValues={initialValues}
                validationSchema={getValidationSchema()}
                onSubmit={handleSubmit}>
                {({ values, setFieldValue, resetForm }) => (
                  <Form className={classes.form}>
                    <div className={classes.forminfo}>
                      {errorMsg ? (
                        <ErrorNotification
                          mssg={errorMsg}
                          linkmsg={errorLinkMsg}
                          link={errorLink}
                        />
                      ) : null}
                      <div className={classes.typeofform}>
                        <div
                          onClick={handlepaidclicked}
                          className={
                            paidclicked ? classes.clickeditem : classes.item
                          }>
                          Paid
                        </div>
                        <div
                          onClick={handlefreeclicked}
                          className={
                            freeclicked ? classes.clickeditem : classes.item
                          }>
                          Free
                        </div>
                        <div
                          onClick={handledonationclicked}
                          className={
                            donationclicked ? classes.clickeditem : classes.item
                          }>
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
                        <ErrorMessage
                          name="availablequantity"
                          component="span"
                        />
                      </div>
                      <div className={classes.boxContainer}>
                        <div
                          className={
                            freeclicked || donationclicked
                              ? classes.fielddisable
                              : classes.fieldContainer
                          }>
                          <label
                            className={classes.label}
                            style={{ paddingLeft: "20px" }}>
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
                            onChange={handlechangetimeorsalesend}>
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
                                      defaultValue={dayjs("2023-05-25")}
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
                                <label className={classes.label}>
                                  Start time
                                </label>
                                <Field
                                  className={classes.field}
                                  name="starttime"
                                  component="select">
                                  {Time.options.map((item, index) => {
                                    return (
                                      <option
                                        key={"AddPromoCodeStartTime" + index}
                                        id={"AddPromoCodeStartTime" + index}
                                        value={item}>
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
                            <label className={classes.label}>
                              Ticket options
                            </label>
                            <Field
                              className={classes.field}
                              name="ticketoption"
                              component="select">
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
                                  defaultValue={dayjs("2023-05-27")}
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
                              component="select">
                              {Time.options.map((item, index) => {
                                return (
                                  <option
                                    key={"AddPromoCodeStartTime" + index}
                                    id={"AddPromoCodeStartTime" + index}
                                    value={item}>
                                    {item}
                                  </option>
                                );
                              })}
                            </Field>
                          </div>
                        </div>
                      </div>

                      <div className={classes.advancedsettings}>
                        <div className={classes.advancedp}>
                          Advanced settings
                        </div>
                        <div
                          onClick={handleclick2}
                          className={
                            advancedopen ? classes.icondown : classes.iconup
                          }>
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
                              style={{ paddingBottom: "4.5rem" }}>
                              <label className={classes.label}>
                                desciption
                              </label>
                              <Field
                                className={classes.field}
                                name="description"
                                placeholder="Tell attendess more about this ticket"
                              />
                            </div>
                          </div>
                          <div className={classes.boxContainer}>
                            <div className={classes.fieldContainer}>
                              <label className={classes.label}>
                                Visibility
                              </label>
                              <Field
                                className={classes.field}
                                name="Visibility"
                                component="select">
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
                                style={{ width: "77%" }}>
                                <label className={classes.label}>
                                  Minimum quantity
                                </label>
                                <Field
                                  className={classes.field}
                                  name="minimumquantity"
                                  onKeyPress={handleKeyPress}></Field>
                              </div>
                            </div>

                            <div className={classes.boxContainer}>
                              <div
                                className={classes.fieldContainer}
                                style={{ width: "77%" }}>
                                <label className={classes.label}>
                                  Maximum quantity
                                </label>
                                <Field
                                  className={classes.field}
                                  name="maximumquantity"
                                  onKeyPress={handleKeyPress}></Field>
                              </div>
                            </div>
                          </div>
                          <div
                            className={classes.boxContainer}
                            style={{ marginBottom: "5rem" }}>
                            <div className={classes.fieldContainer}>
                              <label className={classes.label}>
                                Sales channel
                              </label>
                              <Field
                                className={classes.field}
                                name="saleschannel"
                                component="select">
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
                          type="reset">
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
            </>
          )}
        </Box>
      </SwipeableDrawer>
      {success && (
        <GenericModal
          header="Ticket Added"
          details={"You have succesfully Added a ticket."}
          icon={<TiTick className={classes.modalicon} />}
          rejectbtn="Close"
          rejecthandle={() => setSuccess(false)}
        />
      )}
    </div>
  );
};

export default AddTicketForm;
