import React, { useState, useEffect} from "react";
import classes from "./atendeesummary.module.css";
import CreatorNav from "../../layouts/nav/CreatorNav";
import SideBar from "../../layouts/sideBar/Sidebar";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import { useSelector } from "react-redux";
import SalesCards from "../CreatorEventDetails/creatorDashboard/salesCards/SalesCards";
import IosShareIcon from "@mui/icons-material/IosShare";
import moment from "moment/moment";


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
  const [orders, setOrders] = useState("");
  const [attendees, setAttendees] = useState("");

  const [transactionData, setTransactionData] = useState([]);

  async function handleExport() {
    try {
      axios
        .get(
          routes.getAllEventsCreator +
            event.eventId +
            "/getAttendeeReport/download"
        )
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
    async function getAtendees() {
      let response = "";
      try {
        response = await axios.get(
          routes.getAllEventsCreator +
            event.eventId +
            "/getAttendeeReport?page=1&orderLimit=2"
        );
        setReport(response.data.Report);
        setOrders(response.data.totalOrders)
        setAttendees(response.data.totalAttendees)

        return response.data;
      } catch (error) {
        if (error.response) {
          return error.response;
        }
      }
    }
    getAtendees();
    handleExport();
  }, []);

  return (
    <div>
      <CreatorNav />
      <SideBar />
      <div className={classes.container}>
        <div className={classes.header}>
          <h1>Attendee Summary Report</h1>
        </div>

        {(transactionData.length !== 0)? (
          <div className={classes.export}>
            <IosShareIcon sx={{ fontSize: "18px" }} />
            <a
              href={`data:text/csv;charset=utf-8,${escape(transactionData)}`}
              download="attendee_summary.csv"
            >
              Export
            </a>
          </div>
        ) : (
          <div className={classes.exportDisabled}>
            <IosShareIcon sx={{ fontSize: "18px" }} />
            <p className={classes.disabled}>Export</p>
          </div>
        )}
        <div className={classes.cards}>
          <SalesCards title="Total orders" amount={orders} />
          <SalesCards title="Total Atendees" amount={attendees} />
        </div>

        <div
          id="CreatorDashBoardPageSalesRecentOrdersTableContainer"
          className={classes.attendeetable}
        >
          <table className={classes.tableItslef}>
            <thead>
              <tr className={classes.tableHeader}>
                <th>Order Id</th>
                <th>Order Date</th>
                <th>Attendee Status</th>
                <th>Name</th>
                <th>Email</th>
                <th>Event Name</th>
                <th>Ticket Quantity</th>
                <th>Ticket Type</th>
                <th>Ticket Price</th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
              </tr>
            </thead>
            <tbody id="CreatorDashBoardPageSalesRecentOrdersTableBody">
              {report.map((item, index) => {
                return (
                  <tr>
                    <td className={classes.sold}>{item.orderNumber}</td>
                    <td className={classes.sold}>{moment(item.orderDate).format("L")}</td>
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
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AtendeeSummary;
