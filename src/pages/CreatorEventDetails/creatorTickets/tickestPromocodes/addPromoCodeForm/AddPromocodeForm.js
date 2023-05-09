import classes from "./addPromocodeForm.module.css";
import Drawer from "@mui/material/Drawer";
import { useState, useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import Time from "../../../../../assets/data/TimeOptions";
import axios from "../../../../../requests/axios";
import routes from "../../../../../requests/routes";
import { useSelector } from "react-redux";

const AddPromocodeForm = ({  edit }) => {
  const formikRef = React.useRef(null);

  const [state, setState] = React.useState({
    right: false,
  });

  const event = useSelector((state) => state.event);
  const [csv, setCsv] = useState(false);
  const [amountformopen, setamountformopen] = useState(false);
  const [selectedValuelimit, setSelectedValuelimit] = useState("Unlimited");
  const [scheduleopen, setscheduleopen] = useState(false);
  const [selectedValuestart, setSelectedValuestart] = useState("Now");
  const [dateValuestart, setdateValuestart] = useState("");
  const [scheduleopenend, setscheduleopenend] = useState(false);
  const [selectedValueend, setSelectedValueend] = useState(
    "When ticket sales end"
  );
  const [dateValueend, setdateValueend] = useState("");

  const [tickets, setTickets] = useState([]);
  const [selectedvaluetickets, setselectedvaluetickets] = useState(
    "All visible tickets"
  );
  const [alltickets, setAlltickets] = useState(true);

  const handleSelectedlimit = (selected) => {
    setSelectedValuelimit(selected);
    if (selected == "Limited to") {
      setamountformopen(true);
    } else {
      setamountformopen(false);
    }
  };

  const handleSelectedStart = (selected) => {
    setSelectedValuestart(selected);
    if (selected == "Now") {
      setscheduleopen(false);
    } else {
      setscheduleopen(true);
    }
  };

  const handlestartDatechange = (date) => {
    setdateValuestart(moment(date.$d, "YYYY-MM-DD").format("YYYY-MM-DD"));
  };

  const handleSelectedend = (selected) => {
    setSelectedValueend(selected);
    if (selected == "When ticket sales end") {
      setscheduleopenend(false);
    } else {
      setscheduleopenend(true);
    }
  };

  const handleendDatechange = (date) => {
    setdateValueend(moment(date.$d, "YYYY-MM-DD").format("YYYY-MM-DD"));
  };

  const handleTickets = (choose) => {
    setselectedvaluetickets(choose);
    if (choose == "All visible tickets") {
      setAlltickets(true);
    } else {
      setAlltickets(false);
    }
  };

  const handleSubmit = (data) => {
    console.log(tickets);
    let datasent = data;
    if (!amountformopen) {
      delete datasent.limit;
    } else {
      datasent.limit = Number(datasent.limit);
    }

    if (data.amountOff == "") {
      delete datasent.amountOff;
      datasent.percentOff = Number(datasent.percentOff);
    } else {
      delete datasent.percentOff;
      datasent.amountOff = Number(datasent.amountOff);
    }

    if (scheduleopen) {
      let sDate = new Date(dateValuestart + " " + data.starttime);
      let startDate = sDate.toISOString();
      datasent.startDate = startDate;
    } else {
      let sDate = new Date();
      let startDate = sDate.toISOString();
      datasent.startDate = startDate;
    }

    delete datasent.starttime;

    if (scheduleopenend) {
      let eDate = new Date(dateValueend + " " + data.endtime);
      let endDate = eDate.toISOString();
      datasent.endDate = endDate;
    } else {
      //get event end time
    }

    delete datasent.endtime;

    if (alltickets) {
      let filledArray = new Array(tickets.length)
        .fill()
        .map((element, index) => tickets[index]._id);
      datasent.tickets = filledArray;
    } else {
      //get selected tickets
    }

    if (csv) {
      // convert them to form data
    }

    console.log(datasent);

    formikRef.current.resetForm();
  };

  const toggleDrawer = (anchor, open, csv) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
    formikRef.current.resetForm();
    setCsv(csv);
  };

  /**
   * function that is triggered to get tickets
   * @function getTickets

   */

  async function getTickets() {
    try {
      const response = await axios.get(
        routes.tickets + "/" + event.eventId + "/allTickets"
      );

      setTickets(response.data.tickets);
    } catch (err) {
      console.log(err);
    }
  }

  // /**
  //  * function that is triggered to get tickets
  //  * @function getPromoCode

  //  */

  // async function getPromoCode() {
  //   if (edit) {
  //     try {
  //       const response = await axios.get(
  //         routes.tickets + "/" + event.eventId + "/allTickets"
  //       );
  //     } catch (err) {}
  //   }
  // }

  useEffect(() => {
    getTickets();
    // getPromoCode();
  }, []);

  const initialValues = {
    name: "",
    amountOff: "",
    percentOff: "",
    limit: "",
    starttime: "",
    endtime: "",
    tickets: [],
  };

  const getValidationSchema = () => {
    let schema = Yup.object().shape({
      amountOff: Yup.number().test(
        "one-required",
        "Discount amount or percentage required",
        function (value) {
          return this.parent.percentOff || value;
        }
      ),
      percentOff: Yup.number().test(
        "one-required",
        "Discount amount or percentage required",
        function (value) {
          return this.parent.amountOff || value;
        }
      ),
    });
    if (!csv) {
      schema = schema.shape({
        name: Yup.string()
          .max(50, "Name must be at most 50 characters")

          .required("Provide a code name"),
      });
    }
    if (amountformopen) {
      schema = schema.shape({
        limit: Yup.number().required("Limit Amount is required"),
      });
    }
    if (scheduleopen) {
      schema = schema.shape({
        starttime: Yup.string().required("Start Time is required"),
      });
    }
    if (scheduleopenend) {
      schema = schema.shape({
        endtime: Yup.string().required("Start Time is required"),
      });
    }
    return schema;
  };

  return (
    <div>
      <div className={classes.modalbtns}>
        <div className={classes.btn}>
          <Button
            className={classes.selbutton}
            onClick={toggleDrawer("right", true, true)}
            data-testid="AddTicketButton">
            Upload CSV
          </Button>
        </div>
        <div className={classes.btn}>
          <Button
            className={classes.button}
            onClick={toggleDrawer("right", true, false)}
            data-testid="AddTicketButton">
            Create promo code
          </Button>
        </div>
      </div>

      <SwipeableDrawer
        anchor={"right"}
        open={state["right"]}
        // onClose={toggleDrawer("right", false)}
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
        <Box className={classes.box} sx={{ width: 407 }}>
          <div className={classes.headercontainer}>
            <p className={classes.ticketp}>Add code</p>
          </div>
          {/* <div > */}
          <Formik
            innerRef={formikRef}
            initialValues={initialValues}
            validationSchema={getValidationSchema()}
            onSubmit={handleSubmit}>
            {({ values }) => (
              <Form className={classes.form}>
                <div className={classes.forminfo}>
                  {!csv && (
                    <div className={classes.boxContainer}>
                      <div className={classes.fieldContainer}>
                        <label className={classes.label}>Code name</label>
                        <Field
                          className={classes.field}
                          name="name"
                          autoComplete="off"
                          data-testid="LoginFormEmailInput"
                          placeholder="General Admission"
                        />
                      </div>

                      <ErrorMessage name="name" component="span" />

                      <div className={classes.namep}>
                        Customers can also access this code via custom URL
                      </div>
                    </div>
                  )}

                  <div className={classes.limitcontainer}>
                    <div className={classes.containerstart}>
                      <div className={classes.boxContainer}>
                        <div className={classes.fieldContainer}>
                          <label className={classes.label}>Ticket limit</label>
                          <Field
                            className={classes.field}
                            name="ticketlimitoption"
                            autoComplete="off"
                            component="select"
                            value={selectedValuelimit}
                            onChange={(e) =>
                              handleSelectedlimit(e.target.value)
                            }>
                            <option value="Limited to">Limited to</option>
                            <option value="Unlimited">Unlimited</option>
                          </Field>
                        </div>
                      </div>
                      {amountformopen ? (
                        <>
                          <div className={classes.boxContainer}>
                            <div className={classes.fieldContainer}>
                              <label className={classes.label}>Amount</label>
                              <div className={classes.presuffix}>
                                <Field
                                  className={classes.field}
                                  name="limit"
                                  autoComplete="off"
                                />
                                <p>tickets</p>
                              </div>
                            </div>
                            <ErrorMessage name="limit" component="span" />
                          </div>
                        </>
                      ) : null}
                    </div>
                    <div className={classes.namep}>
                      Total number of tickets that can be purchased with this
                      code
                    </div>
                  </div>

                  <div className={classes.limitcontainer}>
                    <div className={classes.headercontainer2}>
                      Discount Amount
                    </div>
                    <div className={classes.containerstart2}>
                      <div className={classes.boxContainer}>
                        <div className={classes.fieldContainer}>
                          {/* <div className={classes.container2}> */}
                          {/* <span className={classes.dollar}>$</span> */}
                          <Field
                            className={classes.field}
                            name="amountOff"
                            placeholder="0.00"
                            type="text"
                            autoComplete="off"
                            disabled={values.percentOff !== ""}
                          />
                          {/* </div> */}
                        </div>
                      </div>

                      <div className={classes.insidep}>or</div>

                      <div className={classes.boxContainer}>
                        <div className={classes.fieldContainer}>
                          {/* <div className={classes.container2}> */}
                          {/* <span className={classes.dollar}>$</span> */}
                          <Field
                            className={classes.field}
                            name="percentOff"
                            placeholder="0.00"
                            type="text"
                            autoComplete="off"
                            disabled={values.amountOff !== ""}
                          />
                          {/* </div> */}
                        </div>
                      </div>
                    </div>

                    <ErrorMessage name="percentOff" component="span" />
                  </div>

                  <div className={classes.limitcontainer}>
                    <div className={classes.headercontainer2}>
                      Promo code starts
                    </div>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={selectedValuestart}
                        onChange={(e) => handleSelectedStart(e.target.value)}>
                        <FormControlLabel
                          value="Now"
                          control={<Radio />}
                          label="Now"
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: 20,
                            },
                            "& .MuiTypography-root": {
                              fontSize: 13,
                              fontWeight: 4,
                              color: "rgb(57, 54, 79)",
                            },
                          }}
                        />
                        <FormControlLabel
                          value="Scheduledtime"
                          control={<Radio />}
                          label="Scheduled time"
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: 20,
                            },
                            "& .MuiTypography-root": {
                              fontSize: 13,
                              fontWeight: 4,
                              color: "rgb(57, 54, 79)",
                            },
                          }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>

                  {scheduleopen ? (
                    <div
                      className={classes.limitcontainer}
                      style={{ marginTop: "0" }}>
                      <div className={classes.containerstart}>
                        <div className={classes.boxContainer}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={[]}>
                              <DemoItem>
                                <DatePicker
                                  defaultValue={dayjs("2022-04-17")}
                                  onChange={(e) => handlestartDatechange(e)}
                                  sx={{
                                    "& .MuiInputBase-input": {
                                      height: "2rem",
                                      fontSize: 13,
                                      paddingBottom: "1.8rem",
                                      paddingTop: "1.8rem",
                                    },
                                  }}
                                />
                              </DemoItem>
                            </DemoContainer>
                          </LocalizationProvider>
                        </div>

                        <div
                          className={classes.boxContainer}
                          style={{ paddingTop: "0.9rem" }}>
                          <div className={classes.fieldContainer}>
                            <label className={classes.label}>Start time</label>
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
                    </div>
                  ) : null}

                  <div className={classes.limitcontainer}>
                    <div className={classes.headercontainer2}>
                      Promo code ends
                    </div>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={selectedValueend}
                        onChange={(e) => handleSelectedend(e.target.value)}>
                        <FormControlLabel
                          value="When ticket sales end"
                          control={<Radio />}
                          label="When ticket sales end"
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: 20,
                            },
                            "& .MuiTypography-root": {
                              fontSize: 13,
                              fontWeight: 4,
                              color: "rgb(57, 54, 79)",
                            },
                          }}
                        />
                        <FormControlLabel
                          value="Scheduledtime"
                          control={<Radio />}
                          label="Scheduled time"
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: 20,
                            },
                            "& .MuiTypography-root": {
                              fontSize: 13,
                              fontWeight: 4,
                              color: "rgb(57, 54, 79)",
                            },
                          }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>

                  {scheduleopenend ? (
                    <div
                      className={classes.limitcontainer}
                      style={{ marginTop: "0" }}>
                      <div className={classes.containerstart}>
                        <div className={classes.boxContainer}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={[]}>
                              <DemoItem>
                                <DatePicker
                                  defaultValue={dayjs("2022-04-17")}
                                  onChange={(e) => handleendDatechange(e)}
                                  sx={{
                                    "& .MuiInputBase-input": {
                                      height: "2rem",
                                      fontSize: 13,
                                      paddingBottom: "1.8rem",
                                      paddingTop: "1.8rem",
                                    },
                                  }}
                                />
                              </DemoItem>
                            </DemoContainer>
                          </LocalizationProvider>
                        </div>

                        <div
                          className={classes.boxContainer}
                          style={{ paddingTop: "0.9rem" }}>
                          <div className={classes.fieldContainer}>
                            <label className={classes.label}>
                              Expiration time
                            </label>
                            <Field
                              className={classes.field}
                              name="endtime"
                              component="select">
                              {Time.options.map((item, index) => {
                                return (
                                  <option
                                    key={"AddPromoCodeendTime" + index}
                                    id={"AddPromoCodeendTime" + index}
                                    value={item}>
                                    {item}
                                  </option>
                                );
                              })}
                            </Field>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <hr className={classes.promohr} />
                  <div className={classes.limitcontainer}>
                    <div className={classes.headercontainer2}>
                      Apply code to :
                    </div>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={selectedvaluetickets}
                        onChange={(e) => handleTickets(e.target.value)}>
                        <FormControlLabel
                          value="All visible tickets"
                          control={<Radio />}
                          label="All visible tickets"
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: 20,
                            },
                            "& .MuiTypography-root": {
                              fontSize: 13,
                              fontWeight: 4,
                              color: "rgb(57, 54, 79)",
                            },
                          }}
                        />
                        <div className={classes.radiobtntickets}>
                          <FormControlLabel
                            value="Only certain visible tickets"
                            control={<Radio />}
                            label="Only certain visible tickets"
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 20,
                              },
                              "& .MuiTypography-root": {
                                fontSize: 13,
                                fontWeight: 4,
                                color: "rgb(57, 54, 79)",
                              },
                            }}
                          />
                          {!alltickets && <button>Apply</button>}
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
                <div
                  id="EventPageBookingPopUpLeaveCheckOutBtnsContainer"
                  className={classes.leavecheckoutbuttons}>
                  <div
                    id="EventPageBookingPopUpLeaveCheckOutStayBtnContainer"
                    className={classes.stayleavebtn}>
                    <button
                      id="EventPageBookingPopUpLeaveCheckOutStayBtn"
                      className={classes.staybutton}
                      onClick={toggleDrawer("right", false)}>
                      Cancel
                    </button>
                  </div>

                  <div
                    id="EventPageBookingPopUpLeaveCheckOutLeaveBtnContainer"
                    className={classes.stayleavebtn}>
                    <button
                      type="submit"
                      id="EventPageBookingPopUpLeaveCheckOutLeaveBtn"
                      className={classes.leavebutton}>
                      Save
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          {/* </div> */}
        </Box>
      </SwipeableDrawer>
    </div>
  );
};

export default AddPromocodeForm;
