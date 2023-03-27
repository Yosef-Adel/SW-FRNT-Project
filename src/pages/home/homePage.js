import React from "react";
import classes from "./home.module.css";
import NavBar from "../../layouts/nav/NavBar";
import Categories from "./categories/Categories";
// import EventCard from "../../generic components/event card/EventCard";
import Banner from "./banner/Banner";
import Footer from "../../layouts/footer/Footer";
import FilterTabs from "./filter_tabs/FilterTabs";
import EventList from "../../generic components/Event List/EventList";
// import eventImage1 from '../../assets/imgs/events/event1.png';
// import eventImage2 from '../../assets/imgs/events/event2.png';


/**
 * Component that returns Home Page
 * 
 * @component
 * @example
 * return(<HomePage />)
 */
const HomePage = () => {
  return (
    <div className={classes.container}>
      <NavBar />
      <Banner />

      <div className={classes.containerbox}>
        <FilterTabs />
        <Categories />
        <EventList />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
