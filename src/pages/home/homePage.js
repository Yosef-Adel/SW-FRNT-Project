import React from "react";
import Banner from "./banner/Banner";
import classes from "./home.module.css";

const HomePage = () => {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}> Welcome Home Y'all</h1>
      <Banner />
    </div>
  );
};

export default HomePage;
