import React from "react";
import { useState, useEffect } from "react";

import classes from "./eventbanner.module.css";
import { Link, useParams } from "react-router-dom";

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

  return <div className={classes.bannercontainer}>Event Banner</div>;
};

export default EventBanner;
