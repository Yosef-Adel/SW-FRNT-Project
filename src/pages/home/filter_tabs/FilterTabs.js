import React, { useState, useEffect } from "react";
import classes from "./FilterTabs.module.css";
import FilterTabsData from "../../../assets/data/FilterTabsData";
import Location from "../location/Location";
import { NavLink } from "react-router-dom";
import axios from "../../../requests/axios";
import routes from "../../../requests/routes";

/**
 * Component that renders Filter tabs in Landing page
 *
 * @component
 * @example
 * return(<FilterTabs />)
 */

const FilterTabs = () => {
  const page = FilterTabsData.FilterTabsInfo;
  const [clicked, setIndexClicked] = useState(0);
  const [location, setlocation] = useState([]);
  const [events, setEvents] = useState([]);

  const [city, setCity] = useState("");

  async function getLocation(loc) {
    let response = "";
    try {
      if(loc.length>0){
        response = await axios.get(
          routes.events + "/nearest?lat=" + loc[0] + "&lng=" + loc[1]
        );
        setCity(response.data.city);
        setEvents(response.data.events)
        return response.data;
        }
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  }

  useEffect(() => {
    getLocation(location);
  }, [location]);

  //for selecting multiple filters ---- to make it usestate of indexclicked([1,0,0,0,0,0])---- if condition (clicked[index]==1)
  function setclicked(index) {
    if (clicked[index] == 0) {
      let clickedcl = clicked;
      clickedcl[index] = 1;
      setIndexClicked((clicked) => [...clicked, clickedcl]);
    }
  }

  return (
    <div className={classes.container}>
      <Location onDetect={setlocation} City={city} />
      <div className={classes.Filter}>
        <ul>
          {page[0].map((element, index) => {
            return (
              <div>
                <li className={`${classes.FilterItem}`}>
                  <NavLink
                    to={element.route}
                    activeClassName={classes.activeLink}
                  >
                    <div>
                      <div
                        className={
                          index == clicked ? classes.clicked : classes.element
                        }
                        onClick={() => setIndexClicked(index)}
                      >
                        {element.title}
                      </div>
                    </div>
                  </NavLink>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default FilterTabs;
