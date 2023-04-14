import React from "react";
import { useState, useEffect } from "react";
import EventCard from "../event card/EventCard";
import classes from "./eventList.module.css";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import moment from "moment";

const EventList = (props) => {
  const [Eventcards, SetEventcards] = useState([0,0,0,0]);
  const [loading,setLoading] = useState(true);

  async function getEventCards() {
    let response = "";
    try {
      response = await axios.get(routes.events + "?category=" + "" + "&lat=" + "&lng=" );
      SetEventcards(response.data.events);
      setLoading(false)
      console.log(response.data)
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  }

  useEffect(() => {
    getEventCards();
  }, [props.location, props.category]);



  return (
    <div>
      <div className={classes.secheader}>
        <h3>Events in Al Qahirah</h3>
      </div>
      <div className={classes.list}>
        {Eventcards.map((card) => (
          <EventCard
            id={card._id}
            key={card._id}
            img={card.image}
            title={card.name}
            time={moment(card.startDate).format("MMMM Do YYYY")}
            location={card.address1}
            price={card.postalCode} //Price attribute is not provided by backend response
            companyName={card.venueName} //Using venue name as the company name, as company name is not required
            load={loading}
          />
        ))}
      </div>
      {!loading&&
      <div className={classes.moreBtn}>
        <button type="button">See more</button>
      </div>}
    </div>
  );
};

export default EventList;
