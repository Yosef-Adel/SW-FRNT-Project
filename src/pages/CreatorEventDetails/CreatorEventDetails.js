import classes from "./eventDetails.module.css";
import { Routes, Route, useResolvedPath } from "react-router-dom";
import CreatorNav from "../../layouts/nav/CreatorNav";
import SideBar from "../../layouts/sideBar/Sidebar";
import DashboardSidebar from "../../layouts/dashboard/dashboardSidebar";
import CreatorBasicInfo from "./creatorBasicInfo/CreatorBasicInfo";
import CreatorTickets from "./creatorTickets/CreatorTickets";
import CreatorPublish from "./creatorPublish/CreatorPublish";
import CreatorDashboard from "./creatorDashboard/CreatorDashboard";
import CreatorAddAttendee from "./creatorAddAttendee/CreatorAddAttendee";

/**
 * Component that returns Creator's Event Details page
 *
 * @component
 * @example
 * return(<CreatorEventDetails />)
 */
const CreatorEventDetails = () => {
  const path = useResolvedPath("").pathname;
  console.log(path);
  return (
    <>
      <CreatorNav />
      <div className={classes.container}>
        <SideBar />
        <DashboardSidebar />
        <div className={classes.content}>
          <Routes>
            <Route path="/basicinfo" element={<CreatorBasicInfo />} />
            <Route path="/tickets" element={<CreatorTickets />} />
            <Route path="/publish" element={<CreatorPublish />} />
            <Route path="/dashboard" element={<CreatorDashboard />} />
            <Route path="/addattendee" element={<CreatorAddAttendee />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default CreatorEventDetails;
