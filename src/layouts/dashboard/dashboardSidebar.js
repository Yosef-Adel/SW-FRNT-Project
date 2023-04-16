import React from "react";
import classes from "./dashboardsidebar.module.css";
import {BiChevronLeft} from "react-icons/bi"
import {BsBoxArrowUpRight} from "react-icons/bs"

const DashboardSidebar= (props) =>
{
    return(
        <div className={classes.main}>
            <div className={classes.eventDescription}> 
                <div className={classes.backbutton}>
                    <div> <BiChevronLeft size={24}/></div>
                    <div className={classes.backbuttontext}>Events</div>
                </div>
                <div className={classes.selector}>
                <select >
                    <option> Publish now </option>
                    <option> Schedule publish </option>
                </select>
                </div>
                <div className={classes.eventDescriptionText}>
                    <h2>Test</h2>
                    <p>Thu, May 25, 2023, 7:00 PM</p>
                    <div className={classes.viewevent}>
                        <div className>View your event</div> <BsBoxArrowUpRight size={16}/>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <ol className={classes.eventMenu}>
                        <li><div className={classes.circle}> 1 </div>Basic Info</li>
                        <li><div className={classes.circle}> 2 </div>Details</li>
                        <li><div className={classes.circle}> 3 </div>Online Event Page</li>
                        <li><div className={classes.circle}> 4 </div>Tickets</li>
                        <li><div className={classes.circle}> 5 </div>Publish</li>
                    </ol>
                </div>
            </div>
            <div>
                <div className={classes.dashboardbtn}>
                    Dashboard
                </div>
                <div className={classes.dropDown}> 
                  <button className={classes.dropDownBtn}></button>
                  <div></div>
                </div>
                <div>
                <ol className={classes.eventMenu}>
                        <li><div className={classes.circle}> 1 </div>Basic Info</li>
                        <li><div className={classes.circle}> 2 </div>Details</li>
                        <li><div className={classes.circle}> 3 </div>Online Event Page</li>
                        <li><div className={classes.circle}> 4 </div>Tickets</li>
                        <li><div className={classes.circle}> 5 </div>Publish</li>
                    </ol>
                </div>
                <div>
                <ol className={classes.eventMenu}>
                        <li><div className={classes.circle}> 1 </div>Basic Info</li>
                        <li><div className={classes.circle}> 2 </div>Details</li>
                        <li><div className={classes.circle}> 3 </div>Online Event Page</li>
                        <li><div className={classes.circle}> 4 </div>Tickets</li>
                        <li><div className={classes.circle}> 5 </div>Publish</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}

export default DashboardSidebar;