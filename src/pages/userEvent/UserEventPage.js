import React, { useEffect, useState } from "react";
import classes from "./userevent.module.css";
import NavBar from "../../layouts/nav/NavBar";

import Footer from "../../layouts/footer/Footer";
import { useParams } from "react-router-dom";
import EventBanner from "./eventBanner/EventBanner";
import LocationDetails from "./locationDetails/LocationDetails";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import BookingPopup from "./bookingPopup/BookingPopup";

/**
 * Component that returns Event page attendee veiw
 *
 * @component
 * @example
 * return(<UserEventPage />)
 */

const UserEventPage = () => {
  let { _id } = useParams();
  const [event, setEvent] = useState({});

  /**
   * function gets the event data from the server by ID
   * @namespace getEvent
   */

  async function getEvent() {
    console.log(routes.events + "/" + _id);
    try {
      const response = await axios.get(routes.events + "/" + _id);
      console.log(response);
      setEvent(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <div className={classes.container}>
      <NavBar />
      <EventBanner />
      {/* <LocationDetails /> */}
      <BookingPopup eventtitle="AfricArena 2023 VC Unconference Weekend in Cairo, Egypt" date="April 29 · 3pm - May 1 · 3pm EET" />
      <Footer />
    </div>
  );
};

export default UserEventPage;
