import React from "react";
import { useState, useEffect } from "react";
import classes from "./ticketsview.module.css";
import axios from "../../../../../requests/axios";
import routes from "../../../../../requests/routes";
import tickets1 from "../../../../../assets/data/dummytickets";
import { BiErrorCircle } from "react-icons/bi";
import moment from "moment";
// import CircularProgress from "@mui/material/CircularProgress";
import CardInfo from "../../../../../assets/data/eventsData";
import { Formik, Form, Field, ErrorMessage } from "formik";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux"
import CircleLoader from "../../../../../layouts/loader/CircleLoader";

const TicketsView = ({ ticketsnew, dummydata, empty, isloading,setallticketmodal,setindex,seteditform }) => {
  const now = moment();
  const eventi = useSelector((state) => state.event);
  const [loading, setloading] = useState(false);
  const [loading2, setloading2] = useState(false);
  const [tickets, setTickets] = useState(tickets1.tickets2);
  const [fullcapacity, setfullcapacity] = useState(0);
  const [sold, setsold] = useState(0);
  const [event, seteventdata] = useState(CardInfo);
  const [editchange, seteditchange] = useState(false);

  const [state, setState] = React.useState({
    right: false,
  });

  const handleSubmit = (data, { setErrors }) => {
    let datar = data;
    datar.capacity = Number(data.capacity);
    editcap(datar);
  };

  const validationSchema = Yup.object().shape({
    capacity: Yup.number()
      .min(1, "Capacity is required.")

      .required("Capacity is required."),
  });
  
  async function getticketsforevent() {
    try {
      isloading(true);
      setloading(true);
      const response = await axios.get(
        routes.tickets + "/" + eventi.eventId + "/" + "allTickets"
      );
      setTickets(response.data.tickets);
      ticketsnew(response.data.tickets);
      console.log(response.data.tickets);
      setloading(false);
      isloading(false);
      if (response.data.tickets.length == 0) {
        empty(true);
      } else {
        empty(false);
      }
      let totalCapacity = 0;
      let totalSold = 0;
      response.data.tickets.forEach((ticket) => {
        totalCapacity += ticket.capacity;
        totalSold += ticket.sold;
      });
      setfullcapacity(totalCapacity);
      setsold(totalSold);
     
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getticketsforevent();
  }, [dummydata]);

  async function getevent() {
    try {
      const response = await axios.get(
        routes.createEvent + "/" + eventi.eventId
      );
      console.log(response.data);
      seteventdata(response.data);
      setfullcapacity(response.data.capacity);
      initialValues.capacity = response.data.capacity;
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getevent();
  }, [editchange]);
  async function editcap(data) {
    try {
      setloading2(true);
      const response = await axios.put(
        routes.events + "/" + eventi.eventId,
        data
      );
      setloading2(false);
      console.log(response.data);
      seteditchange(!editchange);
    } catch (err) {
      console.log(err);
      setloading2(false);
    }
  }
  const initialValues = {
    capacity: event.capacity,
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
  function handleclick(index){
    setallticketmodal(true);
    setindex(index);
    seteditform(true);

  }

  return (
    <div>
      {loading ? (
        <>
          {/* <div className={classes.loading}>
            <CircularProgress color="success" size={80} />
          </div> */}
          <CircleLoader color={"#4be1a0"} />
        </>
      ) : (
        <div className={classes.container}>
          {tickets.map((Element, index) => {
            return (
              <div className={classes.ticketcontainer} onClick={() => handleclick(index)}>
                <div className={classes.ticketinfo}>
                  <div className={classes.nameanddatecontainer}>
                    <div className={classes.iconbar}>
                      <span>
                        <i
                          data-spec="icon"
                          data-testid="icon"
                          aria-hidden="true">
                          <svg x="0" y="0" viewBox="0 0 24 24">
                            <path
                              fill="#dbdae3"
                              d="M6 10V8h12v2H6zm0 6v-2h12v2H6z"></path>
                          </svg>
                        </i>
                      </span>
                    </div>
                    <div className={classes.nameanddate}>
                      <div>{Element.name}</div>

                      {now.diff(moment(Element.salesEnd)) > 0 ? (
                        <div className={classes.enddatecontainer}>
                          <div className={classes.iconended}></div>

                          <div className={classes.enddate}>
                            Ended {moment(Element.salesEnd).format("ll")}
                          </div>
                        </div>
                      ) : now.diff(moment(Element.salesStart)) < 0 ? (
                        <div className={classes.enddatecontainer}>
                          <div className={classes.iconewaiting}></div>

                          <div className={classes.enddate}>
                            Sales hasn't started yet
                          </div>
                        </div>
                      ) : Element.sold >= Element.capacity ? (
                        <div className={classes.enddatecontainer}>
                          <div className={classes.iconended}></div>

                          <div className={classes.enddate}>Sold out</div>
                        </div>
                      ) : (
                        <div className={classes.enddatecontainer}>
                          <div className={classes.iconactive}></div>

                          <div className={classes.enddate}>
                            On Sale <span className={classes.icon4}></span>Ends{" "}
                            {moment(Element.salesEnd).format("ll")}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={classes.capacityandtypecontainer}>
                    <div className={classes.capacity}>
                      {Element.sold} / {Element.capacity}
                    </div>
                    <div className={classes.type}>{Element.type}</div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className={classes.Eventcapacitycontainer}>
            <div className={classes.capacityinfo}>
              <div className={classes.capacitycontainer}>
                <div className={classes.capacityp}>Event capacity</div>
                <div className={classes.iconp}>
                  <BiErrorCircle />
                </div>
              </div>
              <div className={classes.capacityandtypecontainer}>
                <div className={classes.capacity}>
                  {sold} / {event.capacity}
                </div>
                <div
                  className={classes.buttoncontainer}
                  onClick={toggleDrawer("right", true)}>
                  <button>Edit capacity</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
        }}>
        <Box className={classes.box} sx={{ width: 420, height: "100%" }}>
          <div className={classes.headercontainer}>
            <p className={classes.ticketp}>Event capacity</p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({ values, setFieldValue }) => (
              <Form className={classes.form}>
                <div className={classes.forminfo}>
                  {loading2 ? (
                    <>
                      {/* <div className={classes.loading}>
                        <CircularProgress color="success" size={80} />
                      </div> */}
                      <CircleLoader color={"#4be1a0"} />
                    </>
                  ) : (
                    <>
                      <div className={classes.capacityinfop}>
                        Event capacity is the total number of tickets available
                        for sale at your event. When you set an event capacity,
                        your event will sell out as soon as you sell that number
                        of total tickets. You can adjust your event capacity to
                        prevent overselling.
                      </div>

                      <div className={classes.boxContainer}>
                        <div className={classes.fieldContainer}>
                          <label className={classes.label}>Capacity</label>
                          <Field
                            className={classes.field}
                            name="capacity"
                            value={values.capacity}
                          />
                        </div>
                        <ErrorMessage name="capacity" component="span" />
                      </div>
                    </>
                  )}
                </div>
                <div className={classes.leavecheckoutbuttons}>
                  <div className={classes.stayleavebtn}>
                    <button
                      className={classes.staybutton}
                      onClick={toggleDrawer("right", false)}>
                      Cancel
                    </button>
                  </div>

                  <div className={classes.stayleavebtn}>
                    <button
                      type="submit"
                      className={classes.leavebutton}
                      onClick={toggleDrawer("right", false)}>
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

export default TicketsView;
