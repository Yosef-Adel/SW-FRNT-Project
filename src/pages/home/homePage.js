import React from "react";
import classes from "./home.module.css";
import NavBar from "../../layouts/nav/NavBar";
import Categories from "./categories/Categories";
import EventCard from "../../generic components/event card/EventCard";
import Banner from "./banner/Banner";
import Footer from "../../layouts/footer/Footer";
import FilterTabs from "../../layouts/FilterTabsNav/FilterTabs";

import eventImage1 from '../../assets/imgs/events/event2.png'

const HomePage = () => {
  return (
    <div className={classes.container}>
      <NavBar />
      <Banner />
      
      <div className={classes.containerbox}>
        <FilterTabs/>
        <Categories/>
        <EventCard 
          img={eventImage1}
          title="Celebrating Century : Presidency University"
          time="Tue, Mar 14, 7:00 PM + 37 more events"
          location="Presidency University, Kolkata"
          price="Free"
          companyName="Presidency University"
          followersNo="100"
        />
      </div>
      

      <Footer />
    </div>
  );
};

export default HomePage;
