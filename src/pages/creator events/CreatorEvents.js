import React, { useState, useEffect } from "react";
import classes from "./creatorEvents.module.css";
import CreatorNav from "../../layouts/nav/CreatorNav";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";
import SideBar from "../../layouts/sideBar/Sidebar";
import EventListCard from "./eventListCard";

/**
 * Component that returns Creator's main page
 *
 * @component
 * @example
 * return(<CreatorEvents />)
 */
const CreatorEvents = () => {
  const user = useSelector((state) => state.user);
  const id = user.id;
  const [name, setName] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [eventList, setEventList] = useState([]);

  /**
   * function that sends the request that switchs user type from user to creator
   * @namespace switchCreator
   */
  async function switchCreator() {
    let response = "";
    try {
      response = await axios.get(routes.userToCreator + "/" + id);
      dispatch(
        userActions.creator({
          isCreator: response.data.isCreator,
        })
      );
      setName([user.firstName, user.lastName]);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  }

  /**
   * function that gaurds the creator route => navigates to login page if user not logged in, switches to creator type if user type is 'user'
   * @namespace checkCreator
   */
  const checkCreator = () => {
    if (user.loggedIn) {
      if(!user.isCreator)
      {
        switchCreator();
      } 
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    checkCreator();
  }, []);


  async function getEvents() {
    try {
      const request = await axios.get(routes.getAllEventsCreator + user.id + "/all-events");
      setEventList(request.data.events);
    } catch (err) {

    }
  }

  useEffect(() => {
    console.log(eventList);
  },[eventList]);

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <CreatorNav/>
      <div className={classes.container}>
        <SideBar/>
        <div className={classes.main}>
          <div className={classes.header}>
            <h1>Events</h1>
          </div>
          <div className={classes.events}>
            <ul className={classes.eventTableHeader}>
              <li>Event</li>
              <li>Sold</li>
              <li>Gross</li>
              <li>Status</li>
            </ul>
            <div className={classes.eventTable}>
              {eventList.map((event,index)=>(<EventListCard event={event}/>))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatorEvents;
