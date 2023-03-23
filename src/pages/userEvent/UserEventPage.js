import React from "react";
import classes from "./userevent.module.css";
import NavBar from "../../layouts/nav/NavBar";

import Footer from "../../layouts/footer/Footer";
import { useParams } from "react-router-dom";
import EventBanner from "./eventBanner/EventBanner";
import LocationDetails from "./locationDetails/LocationDetails";

const UserEventPage = () => {
  //   let { id } = useParams();
  //   console.log(id);

  return (
    <div className={classes.container}>
      <NavBar />
      <EventBanner />
      <LocationDetails />
      <Footer />
    </div>
  );
};

export default UserEventPage;
