import React from "react";
import { useState, useEffect } from "react";
import mobimgs from "../../../assets/data/BannerMobImgs";
import labimgs from "../../../assets/data/BannerLabImgs";
import classes from "./banner.module.css";
import header from "../../../assets/imgs/banner/header.svg";
import { Link } from "react-router-dom";

const Banner = () => {
  const [randImg, setrandImg] = useState(
    Math.floor(Math.random() * labimgs.length)
  );

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const imageUrl = windowWidth > 660 ? labimgs[randImg] : mobimgs[randImg];

  useEffect(() => {
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
      className={classes.bannercontainer}
      style={{
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundImage: "url(" + imageUrl + ")",
        // backgroundImage:"image-set(
        //     url("small-landscape-750x536.jpg") 1x,
        //     url("large-landscape-2048x1536.jpg") 2x)",
      }}>
      <div className={classes.bannerheadercontainer}>
        <div className={classes.bannerheaderimg}>
          <img src={header} alt="Now Is Your Time" />
        </div>
        <div className={classes.bannerheaderbtn}>
          <Link to="/" className={classes.bannerheaderlink}>
            <div> Find Your Next Event</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
