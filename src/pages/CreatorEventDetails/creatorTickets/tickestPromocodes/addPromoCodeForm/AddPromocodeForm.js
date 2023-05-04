import classes from "./addPromocodeForm.module.css";
import GenericFilterTabs from "../../../../../generic components/generic filter/GenericFilterTabs";
import TicketsFilterTabs from "../../../../../assets/data/TicketsFilterTabs";
import Drawer from "@mui/material/Drawer";
import { useState, useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const AddPromocodeForm = () => {
  const initialValues = {
    name: "",
    availablequantity: "",
    price: "",
    salesstart: null,
    salesend: null,
    starttime: "",
    endtime: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(50, "Name must be at most 50 characters")

      .required("Please enter a name"),
    availablequantity: Yup.string().required("Quantity is required"),
  });

  const [value, setValue] = React.useState(dayjs("2022-04-17"));

  const [state, setState] = React.useState({
    right: false,
  });
  const [paidclicked, setpaidClicked] = useState(true);
  const [freeclicked, setfreeClicked] = useState(false);
  const [donationclicked, setdonationClicked] = useState(false);
  const [amountformopen, setamountformopen] = useState(false);
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
  const handleSubmit = (data, { setErrors }) => {};

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

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
          style: { height: "1000px", marginTop: 60, marginRight: 20 },
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
              {({ values, setFieldValue }) => (
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
                  <div className={classes.containerstart}>
                    <div className={classes.boxContainer}>
                      <div className={classes.fieldContainer}>
                        <label className={classes.label}>Ticket limit</label>
                        <Field
                          className={classes.field}
                          name="ticketlimit"
                          autoComplete="off"
                          component="select">
                          <option>Limited to</option>
                          <option>Unlimited</option>
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
                              name="ticketlimit"
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>
                  <div className={classes.ticketlimitp}>
                    Total number of tickets that can be purchased with this code
                  </div>
                  <div className={classes.disamount}>Discount amount</div>
                  <div className={classes.containerstart}>
                    <div className={classes.boxContainer}>
                      <div className={classes.fieldContainer}>
                        <label
                          className={classes.label}
                          style={{ paddingLeft: "20px" }}>
                          Price
                        </label>
                        <div className={classes.container2}>
                          <span className={classes.dollar}>$</span>
                          <Field
                            className={classes.field}
                            name="price"
                            placeholder="0.00"
                            type="text"
                            autoComplete="off"
                          />
                        </div>
                      </div>
                    </div>
                    <div className={classes.or}>or</div>

                    <div className={classes.boxContainer}>
                      <div className={classes.fieldContainer}>
                        <Field
                          className={classes.field}
                          name="ticketlimit"
                          autoComplete="off"
                        />
                        <span className={classes.percentage}>%</span>
                      </div>
                    </div>
                  </div>
                  <div>Promo code starts</div>
                  <div className={classes.boxContainer}>
                    <div
                      className={classes.fieldContainer}
                      role="group"
                      aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" name="picked" value="One" />
                        Now
                      </label>

                      <label>
                        <Field type="radio" name="picked" value="One" />
                        Scheduled time
                      </label>
                    </div>
                  </div>
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
