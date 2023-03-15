import classes from './eventCard.module.css'
import React from 'react'
import {HiOutlineUser} from "react-icons/hi";

const EventCard = (props) => {
    return (
      <div className={classes.card}>
        <div className={classes.cardImage}>
            <img src={props.img} alt="event_img" />
        </div>   
        <ul className={classes.cardContent}>
            <h3>
                {props.title}
            </h3>
            <li className={classes.time}>
                {props.time}
            </li>
            <li className={classes.location}>
                <p>{props.location}</p>
                {props.price?<p>{props.price}</p>:null}
            </li>
            <li className={classes.company}>
                <p>{props.companyName}</p>
                <p> <HiOutlineUser size="13"/> {props.followersNo} followers</p>
            </li>
        </ul>         
      </div>
    );
  };
  
  export default EventCard;