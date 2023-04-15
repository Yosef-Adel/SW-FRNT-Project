import React from "react";
import classes from "./sidebar.module.css";
import sideBarCreator from "../../assets/data/sideBarCreator";
import { NavLink } from "react-router-dom";


/**
 * Component that renders creator side bar
 * @component
 * @example
 * return (
 *   <SideBar />
 * )
 */
const SideBar = () => {
  const list = sideBarCreator.list;

  return (
    <div className={classes.sideBar}>
        <ul className={classes.iconsList}>
            {list.map((item) => {
                return(
                    <li key={item.key} className={classes.iconContainer}>
                        <NavLink exact to={item.route} className={({ isActive }) => isActive ? `${classes.activeLink}` : `${classes.normalLink}`}>
                            <li className={classes.iconItem}>
                                {item.icon}
                            </li>
                            <p>{item.title}</p>
                        </NavLink>
                    </li>
                );
            })}
        </ul>
    </div>
  );
};

export default SideBar;
