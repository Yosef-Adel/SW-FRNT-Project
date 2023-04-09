import React from "react";
import classes from "./navbar.module.css";
import creatorNavData from "../../assets/data/creatorNavData";
import logo from "../../assets/brand/envie.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

/**
 * Component that renders nav bar in creators view
 * @component
 * @example
 * return (
 *   <CreatorNav />
 * )
 */
const CreatorNav = (props) => {
  const [user, setUser] = useState(useSelector((state) => state.user));
  const logged = true;
  const email = logged ? user.email : "";
  const list = creatorNavData.list;


  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const display = windowWidth > 940 ? true : false;



  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    console.log(props.name)
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className={classes.nav}>
      <NavLink to="/" activeClassName={classes.activeLink}>
        <div className={classes.logoContainer}>
          <img className={classes.logo} src={logo} alt="logo" />
        </div>
      </NavLink>

      <div className={classes.routes}>
        <ul>
          <li className={`${classes.navItem} ${classes.navItemCreator}`}>
            <div className={`${classes.wrapper} ${classes.wrapperCreator}`}>
              <div className={classes.name}>
                {/* <span>{initials}</span> */}
                {props.name[0]} {props.name[1]} 
                <KeyboardArrowDownIcon className={classes.arrow} />
              </div>
            </div>

            <ol className={classes.dropDown}>
              {list.map((item, index) => {
                return (
                  <li className={`${classes.navSubItem} ${classes.dark}`}>
                    <NavLink
                      to={item.route}
                      activeClassName={classes.activeLink}
                    >
                      {item.icon} {item.title}{" "}
                    </NavLink>
                  </li>
                );
              })}
            </ol>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CreatorNav;
