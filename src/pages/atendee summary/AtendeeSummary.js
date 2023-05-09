import React, { useState, useEffect } from "react";
import classes from "./atendeesummary.module.css";
import CreatorNav from "../../layouts/nav/CreatorNav";
import SideBar from "../../layouts/sideBar/Sidebar";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import { useSelector } from "react-redux";
import SalesCards from "../CreatorEventDetails/creatorDashboard/salesCards/SalesCards";
import IosShareIcon from "@mui/icons-material/IosShare";

/**
 * Component that returns Creator's main page
 *
 * @component
 * @example
 * return(<CreatorHomePage />)
 */
const AtendeeSummary = () => {
    const event = useSelector((state) => state.event);
    const [report, setReport] = useState([]);   
  useEffect(() => {
    async function getAtendees() {
      let response = "";
      try {
        response = await axios.get(
          routes.getAllEventsCreator +
            event.eventId +
            "/getAttendeeReport?page=1&orderLimit=2"
        );
        console.log(response.data);
        setReport(response.data.Report);
        return response.data;
      } catch (error) {
        if (error.response) {
          return error.response;
        }
      }
    }
    getAtendees();
  }, []);
  return (
    <div>
      <CreatorNav />
      <SideBar />
      <div className={classes.container}>
        <div className={classes.header}>
          <h1>Atendee Summary Report</h1>
        </div>
        <div className={classes.export}>
          <IosShareIcon sx={{ fontSize: "18px" }} />
          <div>export</div>
        </div>
        <div className={classes.cards}>
          <SalesCards title="Total orders" amount="3" />
          <SalesCards title="Total Atendees" amount="3" />
        </div>

        <div
          id="CreatorDashBoardPageSalesRecentOrdersTableContainer"
          className={classes.salestable}
        >
          <table id="CreatorDashBoardPageSalesRecentOrdersTable">
            <thead id="CreatorDashBoardPageSalesRecentOrdersTableHead">
                <tr>
                    <td>Order Id</td>
                    <td>Order Date</td>
                    <td>Atendee Status</td>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Event Name</td>
                    <td>Ticket Quantity</td>
                    <td>Ticket Type</td>
                    <td>Ticket Price</td>
                    <td>Buyer Name</td>
                    <td>Buyer Email</td>
                </tr>
            </thead>
            <tbody id="CreatorDashBoardPageSalesRecentOrdersTableBody">
              {report.map((item, index) => {
                return (
                  <tr>
                    <td className={classes.sold}>{item.orderNumber}</td>
                    <td className={classes.sold}>{item.orderDate}</td>
                    <td className={classes.sold}>{item.attendeeStatus}</td>
                    <td className={classes.sold}>{item.name}</td>
                    <td className={classes.sold}>{item.email}</td>
                    <td className={classes.sold}>{item.eventName}</td>
                    <td className={classes.sold}>{item.ticketQuantity}</td>
                    <td className={classes.sold}>{item.ticketType}</td>
                    <td className={classes.sold}>{item.ticketPrice}</td>
                    <td className={classes.sold}>{item.BuyerName}</td>
                    <td className={classes.sold}>{item.BuyerEmail}</td>
                  </tr>
                );
              })}
              <tr>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AtendeeSummary;
