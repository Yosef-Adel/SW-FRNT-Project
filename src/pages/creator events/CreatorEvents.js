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
              <div className={classes.event}>
                <div className={classes.eventDetails}>
                  <div className={classes.eventDate}>
                    <p className={classes.month}>Jun</p>
                    <p className={classes.day}>17</p>
                  </div>
                  <div className={classes.eventImgContainer}>
                    <img src="https://picsum.photos/200/300" alt="" />
                  </div>
                  <div className={classes.eventInfo}>
                    <p className={classes.eventName}>Event Name</p>
                    <p className={classes.eventLocation}>Location</p>
                    <p className={classes.eventTime}>Saturday June</p>
                  </div>
                </div>
                <div className={classes.eventStats}>
                  <p className={classes.eventSold}>0</p>
                </div>
                <div className={classes.eventStats}>
                  <p>0</p>
                </div>
                <div className={classes.eventStats}>
                  <p>0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatorEvents;
