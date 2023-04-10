import React, {useState, useEffect} from "react";
import classes from "./home.module.css";
import NavBar from "../../layouts/nav/NavBar";
import Categories from "./categories/Categories";
// import EventCard from "../../generic components/event card/EventCard";
import Banner from "./banner/Banner";
import Footer from "../../layouts/footer/Footer";
import FilterTabs from "./filter_tabs/FilterTabs";
import EventList from "../../generic components/Event List/EventList";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import {useSelector} from 'react-redux';



/**
 * Component that returns Home Page
 * 
 * @component
 * @example
 * return(<HomePage />)
 */
const HomePage = () => {
  const user = useSelector( state => state.user)
  const id = user.id;

  async function switchCreator() {
    let response = "";
    try {
      response = await axios.get(
        routes.creatorToUser+"/"+id
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  }

  const checkCreator = () => {
    if(user.loggedIn && user.isCreator){
        switchCreator();
    }
  }

  useEffect(() => {
    checkCreator();
    console.log(user)
  }, []);

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
