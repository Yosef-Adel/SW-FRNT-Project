import React from "react";
import classes from "./home.module.css";
import NavBar from "../../layouts/nav/NavBar";
import Categories from "./categories/Categories";

import Banner from "./banner/Banner";
import Footer from "../../layouts/footer/Footer";

const HomePage = () => {
  return (
    <div className={classes.container}>
      <NavBar />
      <Banner />
      <Categories/>
      <Footer />
    </div>
  );
};

export default HomePage;
