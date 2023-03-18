import React from "react";
import { useState, useEffect } from "react";

import classes from "./eventbanner.module.css";
import { Link, useParams } from "react-router-dom";
import bannercurve from "../../../assets/imgs/banner/eventbanner.svg";
import event from "../../../assets/imgs/banner/event2.jpg";
import mobimgs from "../../../assets/data/BannerLabImgs";

const EventBanner = () => {
  let { id } = useParams();

  useEffect(() => {
    console.log(id);
  }, []);

  return (
    <div
      className={classes.eventbannercontainer}
      style={{
        backgroundImage: "url(" + bannercurve + ")",
      }}>
      <div className={classes.imgbackgroundcontainer}>
        <div
          className={classes.imgbackground}
          style={{
            backgroundImage: "url(" + event + ")",
          }}>
          <div className={classes.eventimgcontainer}>
            <img className={classes.eventimg} src={event} alt="Event" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventBanner;
