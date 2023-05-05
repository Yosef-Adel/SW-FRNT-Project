import classes from "./addPromocodeForm.module.css";
import Drawer from "@mui/material/Drawer";
import { useState, useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import { Formik, Form, Field } from "formik";
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

const AddPromocodeForm = () => {
  const initialValues = {
    name: "",
    amountOff: "",
    percentOff: "",
    limit: "",
    starttime: "",
    endtime: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(50, "Name must be at most 50 characters")

      .required("Please enter a name"),
  });

  const [state, setState] = React.useState({
    right: false,
  });

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

  const[tickets,setTickets] = useState([]);

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
    // console.log(moment(date.$d , "YYYY-MM-DD").format("YYYY-MM-DD"));
    // const tdate = new Date(moment(date.$d , "YYYY-MM-DD").format("YYYY-MM-DD"));
    setdateValuestart(moment(date.$d, "YYYY-MM-DD").format("YYYY-MM-DD"));
    // console.log(tdate.toISOString());
    // console.log(typeof(tdate.toISOString()));
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

  const handleSubmit = (data) => {
    console.log(data)
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  

  useEffect(() => {
    console.log(dayjs("2022-04-17"));
    // console.log(moment('03/04/2008 10:45 PM', 'DD/MM/YYYY HH:mm:ss a').format());
    // const date = new Date("03/04/2008 10:45 PM");
    // console.log(date.toISOString())
  }, []);
  return (
    <div>
      <div className={classes.btn}>
        <Button
          className={classes.button}
          onClick={toggleDrawer("right", true)}
          data-testid="AddTicketButton">
          Create promo code
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
          style: { height: "100%", marginTop: 60, marginRight: 20 },
        }}>
        <Box className={classes.box} sx={{ width: 407 }}>
          <div className={classes.headercontainer}>
            <p className={classes.ticketp}>Add code</p>
          </div>
          <div className={classes.forminfo}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}>
              {({ values}) => (
                <Form>
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

                    <div className={classes.namep}>
                      Customers can also access this code via custom URL
                    </div>
                  </div>

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
                              <Field
                                className={classes.field}
                                name="limit"
                                autoComplete="off"
                              />
                            </div>
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
                          <div className={classes.container2}>
                            <span className={classes.dollar}>$</span>
                            <Field
                              className={classes.field}
                              name="amountOff"
                              placeholder="0.00"
                              type="text"
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      </div>

                      <div className={classes.insidep}>or</div>

                      <div className={classes.boxContainer}>
                        <div className={classes.fieldContainer}>
                          <div className={classes.container2}>
                            <span className={classes.dollar}>$</span>
                            <Field
                              className={classes.field}
                              name="percentOff"
                              placeholder="0.00"
                              type="text"
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
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

                </Form>
              )}
            </Formik>
          </div>
        </Box>
      </SwipeableDrawer>
    </div>
  );
};

export default AddPromocodeForm;
