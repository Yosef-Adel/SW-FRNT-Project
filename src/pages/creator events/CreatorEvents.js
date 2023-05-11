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
import IosShareIcon from "@mui/icons-material/IosShare";
import Loader from "../../layouts/loader/Loader";
import {AiOutlineSearch} from "react-icons/ai";
import {AiOutlineUnorderedList} from "react-icons/ai";
import {BsCalendarEvent} from "react-icons/bs";

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
  const [transactionData, setTransactionData] = useState([]);
  const [loader, setLoader] = useState(false);


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
      if (!user.isCreator) {
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
    setLoader(true);
    try {
      const request = await axios.get(
        routes.getAllEventsCreator + user.id + "/all-events"
      );
      setLoader(false);
      setEventList(request.data.events);
    } catch (err) {
      setLoader(false);
    }
  }

  async function handleExport() {
    try {
      axios
        .get(routes.getAllEventsCreator + user.id + "/all-events/download")
        .then((resp) => {
          setTransactionData(resp.data);
        });
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  }

  useEffect(() => {
    getEvents();
    handleExport();
  }, []);

  return (
    <>
      <CreatorNav />
      <div className={classes.container}>
        <SideBar />
        <div className={classes.main}>
          <div className={classes.header}>
            <h1>Events</h1>
          </div>
          {!loader&&
          <div className={classes.btn}>
            <div className={classes.btnsList}>
              <div className={classes.searchField}>
                <AiOutlineSearch size={"2rem"}/>
                <input
                  type="text"
                  placeholder="Search events"
                  className={classes.search}
                  disabled
                />
              </div>
              <div className={classes.unusedBtn}>
                <AiOutlineUnorderedList size={"1.8rem"} color="#FFFFFF"/>
                <p>List</p>
              </div>
              <div className={classes.unusedBtnCalendar}>
                <p>Calendar</p>
              </div>
              <div className={classes.unusedBtn}>
                <p>Draft</p>
              </div>
            </div>
            <button
              type="button"
              className={classes.button}
              data-testid="toCreateEventBtn"
              onClick={() => navigate("/create")}
            >
              Create Event
            </button>
          </div>}
          <div className={classes.events}>
            <ul className={classes.eventTableHeader}>
              <li>Event</li>
              <li>Sold</li>
              <li>Gross</li>
              <li>Status</li>
            </ul>
            {loader && <Loader color={"#4be1a0"} />}
            <div className={classes.eventTable}>
              {eventList.map((event, index) => (
                <EventListCard event={event} />
              ))}
            </div>
          </div>
          {transactionData.length !== 0 ? (
            <div className={classes.export}>
              <IosShareIcon sx={{ fontSize: "18px" }} />
              <a
                href={`data:text/csv;charset=utf-8,${escape(transactionData)}`}
                download="events.csv"
                data-testid="EventsExport"
              >
                CSV Export
              </a>
            </div>
          ) : (
            <div className={classes.exportDisabled}>
              <IosShareIcon sx={{ fontSize: "18px" }} />
              <p
                className={classes.disabled}
                data-testid="EventsExportDisabled"
              >
                CSV Export
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreatorEvents;
