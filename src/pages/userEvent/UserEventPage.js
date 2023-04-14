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
import moment from "moment";
import {AiOutlineFieldTime} from "react-icons/ai";
import {TfiTicket} from "react-icons/tfi"

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
      <EventBanner image={event.image} />
      <div className={classes.eventdatails}>
        <div className={classes.aboutEvTitle}>
          <h2>About this event</h2>
        </div>
        <div className={classes.aboutEvcontainer}>
          <div className={classes.aboutEVIcons}>
            <AiOutlineFieldTime size={24}/>
          </div>
          <div>
            <TfiTicket size={24}/>
          </div>

        <div className={classes.aboutEvSummary}>
            {event.summary}
        </div>
        </div>
        <BookingPopup
          eventtitle={event.name}
          date={moment(event.startDate).format("MMMM Do YYYY")}
          image={event.image}
        />
      </div>
      {/* <LocationDetails /> */}
      <Footer />
    </div>
  );
};

export default UserEventPage;
