import React from "react";
import classes from "./dashboardsidebar.module.css";
import {BiChevronLeft} from "react-icons/bi";
import {BsBoxArrowUpRight} from "react-icons/bs";
import dashboardSidebarData from "../../assets/data/dashboardSidebarData";
import {MdKeyboardArrowDown} from "react-icons/md";

const DashboardSidebar= (props) =>
{
    const eventdetailsList = dashboardSidebarData.eventDetails;
    const eventManagementList= dashboardSidebarData.eventManagement;
    console.log(dashboardSidebarData);
    console.log(eventdetailsList);
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
                        {eventdetailsList.map((eventdata,index)=>{
                            return(
                                <li>
                                    <div className={classes.circle}>
                                        {index+1}
                                    </div>
                                    {eventdata.title}
                                </li>
                                )
                                }
                            )}
                    </ol>
                </div>
            </div>
            <div>
                <div className={classes.dashboardbtn}>
                    Dashboard
                </div>
                <div>
                <ul className={classes.eventMenu}>
                    {
                    eventManagementList.map((menutitle)=>
                    {
                        return(
                            <li><div>{menutitle.title}</div><div className={classes.dashboardimg}><MdKeyboardArrowDown size={25}/></div></li>
                            )})}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default DashboardSidebar;