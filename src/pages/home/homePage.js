import React from "react";
import classes from "./home.module.css";
import NavBar from "../../layouts/nav/NavBar";

import Banner from "./banner/Banner";
import Footer from "../../layouts/footer/Footer";
import FilterTabs from "../../layouts/FilterTabsNav/FilterTabs";

const HomePage = () => {
  return (
    <div className={classes.container}>
      <NavBar />
      <Banner />
      <div className={classes.containerbox}>
        <FilterTabs />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
