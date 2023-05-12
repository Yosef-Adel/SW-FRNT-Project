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
import CircularProgress from "@mui/material/CircularProgress";
import empty from "../../../../../assets/imgs/events/emptypromos.svg";

const AddPromocodeForm = ({
  setdummydata,
  dummydata,
  emptypromo,
  loadinglist,
}) => {
  // const formikRef = React.useRef(null);
  const [loading, setloading] = useState(false);
  const [state, setState] = React.useState({
    right: false,
  });
  const event = useSelector((state) => state.event);
  const [csv, setCsv] = useState(false);
  const [amountformopen, setamountformopen] = useState(false);
  const [selectedValuelimit, setSelectedValuelimit] = useState("Unlimited");
  const [scheduleopen, setscheduleopen] = useState(false);
  const [selectedValuestart, setSelectedValuestart] = useState("Now");
  const [dateValuestart, setdateValuestart] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [scheduleopenend, setscheduleopenend] = useState(false);
  const [selectedValueend, setSelectedValueend] = useState(
    "When ticket sales end"
  );
  const [dateValueend, setdateValueend] = useState(
    moment().format("YYYY-MM-DD")
  );

  const [tickets, setTickets] = useState([]);
  const [selectedvaluetickets, setselectedvaluetickets] = useState(
    "All visible tickets"
  );
  const [alltickets, setAlltickets] = useState(true);
  const [csvfile, setCsvfile] = useState("");

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

  async function sendData(data) {
    console.log(data);
    setloading(true);
    try {
      const request = await axios.post(
        routes.promocode + "/" + event.eventId,
        data
      );
      console.log(request);
      setdummydata(!dummydata);
      toggleDrawer("right", false, csv);
      setloading(false);
    } catch (err) {}
  }

  async function uploadData(data) {
    console.log(data);
    setloading(true);
    try {
      const request = await axios.post(
        routes.promocode + "/" + event.eventId + "/upload",
        data
      );
      console.log(request);
      setdummydata(!dummydata);
      toggleDrawer("right", false, csv);
      setloading(false);
    } catch (err) {}
  }

  const handleSubmit = (data) => {
    console.log(tickets);
    let datasent = data;
    const formData = new FormData();
    if (!amountformopen) {
      delete datasent.limit;
    } else {
      datasent.limit = Number(datasent.limit);
      formData.append("limit", datasent.limit);
    }

    if (data.amountOff == "") {
      delete datasent.amountOff;
      datasent.percentOff = Number(datasent.percentOff);
      formData.append("percentOff", datasent.percentOff);
    } else {
      delete datasent.percentOff;
      datasent.amountOff = Number(datasent.amountOff);
      formData.append("amountOff", datasent.amountOff);
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

    formData.append("startDate", datasent.startDate);

    delete datasent.starttime;

    if (scheduleopenend) {
      let eDate = new Date(dateValueend + " " + data.endtime);
      let endDate = eDate.toISOString();
      datasent.endDate = endDate;
    } else {
      //get event end time
      datasent.endDate = event.endDate;
    }
    formData.append("endDate", datasent.endDate);
    delete datasent.endtime;

    if (alltickets) {
      let filledArray = new Array(tickets.length)
        .fill()
        .map((element, index) => tickets[index]._id);
      datasent.tickets = filledArray;
      formData.append("tickets", filledArray);
    } else {
      //get selected tickets
    }

    if (csv) {
      // convert them to form data
      // --form 'file=@"/E:/projects/eventbrite/SW-BACKEND-Project/test.csv"' \
      let input2 = document.getElementById("input");
      console.log(input2.files[0]);
      if (input2.files[0]) {
        formData.append("file", input2.files[0]);
        uploadData(formData);
      }
    } else {
      console.log(datasent);
      sendData(datasent);
    }

    // Formik.resetForm();
  };

  const toggleDrawer = (anchor, open, csv) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setCsv(csv);
    setState({ ...state, [anchor]: open });
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

  useEffect(() => {
    getTickets();
  }, []);

  const initialValues = {
    name: "",
    amountOff: "",
    percentOff: "",
    limit: "",
    starttime: "10:00 AM",
    endtime: "10:00 PM",
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
      {!loadinglist && (
        <div>
          {emptypromo ? (
            <div className={classes.emptypromos}>
              <div className={classes.emptypromosdesc}>
                <div className={classes.emptypromossec}>
                  <div
                    id="CreatorticketsPagepromocodesHeader"
                    className={classes.mainsectionheader}>
                    Attract more attendees with promo codes
                  </div>
                  <div className={classes.emptypromosumm}>
                    With promo codes, you can offer reduced prices with discount
                    codes or reveal hidden tickets to attendees with access
                    codes.
                  </div>
                  <div className={classes.emptypromosumm}>
                    You can create codes or upload a CSV to import ones you’ve
                    already made.
                  </div>
                </div>
                <div className={classes.emptyimg}>
                  <img src={empty} alt="Empty-PromoList" />
                </div>
              </div>
              <div className={classes.modalemptybtns}>
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
            </div>
          ) : (
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
                  Add Code
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

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
          {loading ? (
            <>
              <div className={classes.loading}>
                <CircularProgress color="success" size={80} />
              </div>
            </>
          ) : (
            <Formik
              initialValues={initialValues}
              validationSchema={getValidationSchema()}
              onSubmit={handleSubmit}>
              {({ values, resetForm }) => (
                <Form className={classes.form}>
                  <div className={classes.forminfo}>
                    {!csv ? (
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
                    ) : (
                      <div>
                        {/* <div>
                        Upload up to 500 codes from a .csv or .txt file.
                        <br />
                        Separate codes with commas, or list them on separate
                        lines.
                        <br />
                        Spaces, apostrophes, and special characters (except: -_
                        , @ . ) are not allowed.
                      </div> */}
                        <div className={classes.uploadBtn}>
                          <input
                            id="input"
                            type="file"
                            className={classes.customfileinput}
                          />
                        </div>
                      </div>
                    )}

                    <div className={classes.limitcontainer}>
                      <div className={classes.containerstart}>
                        <div className={classes.boxContainer}>
                          <div className={classes.fieldContainer}>
                            <label className={classes.label}>
                              Ticket limit
                            </label>
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
                                    defaultValue={dayjs(
                                      moment().format("YYYY-MM-DD")
                                    )}
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
                                    defaultValue={dayjs(
                                      moment().format("YYYY-MM-DD")
                                    )}
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
                            {!alltickets && (
                              <div className={classes.buttoncontainer}>
                                <button>Select</button>
                              </div>
                            )}
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
                        onClick={toggleDrawer("right", false, csv)}
                        type="reset">
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
          )}
          {/* </div> */}
        </Box>
      </SwipeableDrawer>
    </div>
  );
};

export default AddPromocodeForm;
