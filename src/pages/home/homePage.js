import React from "react";
import classes from "./home.module.css";
import NavBar from "../../layouts/nav/NavBar";
import Categories from "./categories/Categories";
import EventCard from "../../generic components/event card/EventCard";
import Banner from "./banner/Banner";
import Footer from "../../layouts/footer/Footer";
import FilterTabs from "../../layouts/FilterTabsNav/FilterTabs";
import EventList from "../../generic components/Event List/EventList";
import eventImage1 from '../../assets/imgs/events/event1.png';
import eventImage2 from '../../assets/imgs/events/event2.png';

const HomePage = () => {
  return (
    <div className={classes.container}>
      <NavBar />
      <Banner />
      
      <div className={classes.containerbox}>
        <FilterTabs/>
        <Categories/>
        <div className={classes.secheader}>
        <h3>Events in Al Qahirah</h3>
        </div>
        <div className={classes.list}>
          <EventList/>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default HomePage;
