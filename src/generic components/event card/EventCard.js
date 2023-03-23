import classes from "./eventCard.module.css";
import React from "react";
import { HiOutlineUser } from "react-icons/hi";
import { Link } from "react-router-dom";

/**
 * Component that renders the event card in user view
 * @component
 * @example
 * return (
 *  <EventCard 
          img="srcURL"
          title="Celebrating Century : Presidency University"
          time="Tue, Mar 14, 7:00 PM + 37 more events"
          location="Presidency University, Kolkata"
          price="Free"
          companyName="Presidency University"
          followersNo="100"
        />
 * )
 */
const EventCard = (props) => {
  return (
    <Link to={`/user/event/${props.id}`} className={classes.card}>
      <div className={classes.cardImage}>
        <img src={props.img} alt="event_img" />
      </div>
      <ul className={classes.cardContent}>
        <h3>{props.title}</h3>
        <li className={classes.time}>{props.time}</li>
        <li className={classes.location}>
          <p>{props.location}</p>
          {props.price ? <p>{props.price}</p> : null}
        </li>
        <li className={classes.company}>
          <p>{props.companyName}</p>
          <p>
            {" "}
            <HiOutlineUser size="13" /> {props.followersNo} followers
          </p>
        </li>
      </ul>
    </Link>
  );
};

export default EventCard;
