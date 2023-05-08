import React from "react";
import { useState, useEffect } from "react";
import classes from "./ticketsview.module.css";
import axios from "../../../../../requests/axios";
import routes from "../../../../../requests/routes";
import tickets1 from "../../../../../assets/data/dummytickets";
import { BiErrorCircle } from "react-icons/bi";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
const TicketsView = ({ eventID }) => {
  const now = moment();

  const [loading, setloading] = useState(false);
  const [tickets, setTickets] = useState(tickets1.tickets2);
  async function getticketsforevent() {
    try {
      setloading(true);
      const response = await axios.get(
        routes.tickets + "/" + eventID + "/" + "allTickets"
      );
      setTickets(response.data.tickets);
      setloading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getticketsforevent();
  }, []);

  return (
    <div>
      {loading ? (
        <>
          <div className={classes.loading}>
            <CircularProgress color="success" size={80} />
          </div>
        </>
      ) : (
        <div className={classes.container}>
          {tickets.map((Element, index) => {
            return (
              <div className={classes.ticketcontainer}>
                <div className={classes.ticketinfo}>
                  <div className={classes.nameanddatecontainer}>
                    <div className={classes.iconbar}>
                      <span>
                        <i
                          data-spec="icon"
                          data-testid="icon"
                          aria-hidden="true"
                        >
                          <svg x="0" y="0" viewBox="0 0 24 24">
                            <path
                              fill="#dbdae3"
                              d="M6 10V8h12v2H6zm0 6v-2h12v2H6z"
                            ></path>
                          </svg>
                        </i>
                      </span>
                    </div>
                    <div className={classes.nameanddate}>
                      <div>{Element.name}</div>
                      {now.diff(moment(Element.salesEnd)) > 0 ? (
                        <div className={classes.enddatecontainer}>
                          <div className={classes.iconended}></div>

                          <div className={classes.enddate}>
                            Ended {moment(Element.salesEnd).format("ll")}
                          </div>
                        </div>
                      ) : (
                        <div className={classes.enddatecontainer}>
                          <div className={classes.iconactive}></div>

                          <div className={classes.enddate}>
                            Ends {moment(Element.salesEnd).format("ll")}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={classes.capacityandtypecontainer}>
                    <div className={classes.capacity}>
                      {Element.sold} / {Element.capacity}
                    </div>
                    <div className={classes.type}>{Element.type}</div>
                  </div>
                </div>
                <div className={classes.Eventcapacitycontainer}>
                  <div className={classes.capacityinfo}>
                    <div className={classes.capacitycontainer}>
                      <div className={classes.capacityp}>Event capacity</div>
                      <div className={classes.iconp}>
                        <BiErrorCircle />
                      </div>
                    </div>
                    <div className={classes.capacityandtypecontainer}>
                      <div className={classes.capacity}>
                        {Element.sold} / {Element.capacity}
                      </div>
                      <div className={classes.buttoncontainer}>
                        <button>Edit capacity</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TicketsView;
