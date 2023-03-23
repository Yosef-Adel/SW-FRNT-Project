import React from "react";
import EventCard from "../event card/EventCard";
import CardInfo from "../../assets/data/eventsData";
import classes from "./eventList.module.css";

const EventList = () => {
  return (
    <div>
      <div className={classes.secheader}>
        <h3>Events in Al Qahirah</h3>
      </div>
      <div className={classes.list}>
        {CardInfo.map((card) => (
          <EventCard
            id={card.id}
            key={card.id}
            img={card.img}
            title={card.title}
            time={card.time}
            location={card.location}
            price={card.price}
            companyName={card.companyName}
            followersNo={card.followersNo}
          />
        ))}
      </div>
      <div className={classes.moreBtn}>
        <button type="button">See more</button>
      </div>
    </div>
  );
};

export default EventList;
