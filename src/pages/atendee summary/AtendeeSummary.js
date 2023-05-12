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
import Loader from "../../layouts/loader/Loader";



/**
 * Component that returns Creator's main page
 *
 * @component
 * @example
 * return(<CreatorHomePage />)
 */
const AtendeeSummary = () => {
  const arrow = <svg  x="0" y="0" viewBox="0 0 24 24" ><path fill-rule="evenodd" clip-rule="evenodd" d="M13.8 7l-5 5 5 5 1.4-1.4-3.6-3.6 3.6-3.6z"></path></svg>
  const event = useSelector((state) => state.event);

  const initialPag = {"nextPage":null,"prevPage":null}

  const [report, setReport] = useState([]);
  const [orders, setOrders] = useState("");
  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState(initialPag);
  const [attendees, setAttendees] = useState("");
  const [loader, setLoader] = useState(false);


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

  async function getAtendees() {
    setLoader(true);
    let response = "";
    try {
      response = await axios.get(
        routes.getAllEventsCreator +
          event.eventId +
          "/getAttendeeReport?page=" + page + "&orderLimit=5"
      );
      setLoader(false)
      setReport(response.data.Report);
      setPagination(response.data.pagination)
      setOrders(response.data.totalOrders)
      setAttendees(response.data.totalAttendees)

      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  }

  useEffect(() => {
    getAtendees();
  }, [page]);

  useEffect(() => {
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
        <div className={classes.cardsContainer}>
          <div className={classes.cards}>
            <SalesCards title="Total orders" amount={orders} />
            <SalesCards title="Total Atendees" amount={attendees} />
          </div>
          <div className={classes.icons}>
            <span className={`${pagination.prevPage===null && classes.disable}`} onClick={(pagination.prevPage!==null ? ()=> {setPage(page-1); }: undefined)}>{arrow}</span>
            <span className={`${pagination.nextPage===null && classes.disable}`} onClick={(pagination.nextPage!==null ? ()=> {setPage(page+1); }: undefined)}>{arrow}</span>            
          </div>
        </div>
            {loader && <Loader color={"#4be1a0"}/>}
        <div
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
