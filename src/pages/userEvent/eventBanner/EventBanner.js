import React from "react";
import { useState, useEffect } from "react";

import classes from "./eventbanner.module.css";
import { Link, useParams } from "react-router-dom";
import bannercurve from "../../../assets/imgs/banner/eventbanner.svg";
import mobimgs from "../../../assets/data/BannerMobImgs";

const EventBanner = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  let { id } = useParams();

  useEffect(() => {
    console.log(id);
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div
      className={classes.eventbannercontainer}
      style={{
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundImage: "url(" + bannercurve + ")",
      }}>
      <div className={classes.imgbackgroundcontainer}>
        <div
          className={classes.imgbackground}
          style={{
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundImage: "url(" + mobimgs[0] + ")",
          }}>
          <img className={classes.eventimg} src={mobimgs[0]} alt="Event" />
        </div>
      </div>
    </div>
  );
};

export default EventBanner;
