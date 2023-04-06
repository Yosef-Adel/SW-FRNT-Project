import React from "react";
import { useState, useEffect } from "react";

import classes from "./tickets.module.css";
import { Link, useParams } from "react-router-dom";
import tickets from "../../../../assets/data/dummytickets";

const TicketsDetails = ({ eventtitle, date, calculateprice }) => {
  //   const filledArray = Array(tickets.tickets.length).fill(0);
  const filledArray = new Array(tickets.tickets.length)
    .fill()
    .map((element, index) => ({
      ticketClass: tickets.tickets[index]._id,
      number: 0,
    }));

  //   const [ticketsAmount, setTicketsAmount] = useState(filledArray);
  const [ticketsAmount, setTicketsAmount] = useState(filledArray);
  const [subtotal, setSubtotal] = useState(0.0);
  const [fee, setFee] = useState(0.0);
  const [total, setTotal] = useState(0.0);

  function addamount(index) {
    if (
      ticketsAmount[index].number < tickets.tickets[index].maxQuantityPerOrder
    ) {
      let amount = ticketsAmount;
      amount[index].number = amount[index].number + 1;
      setTicketsAmount((ticketsAmount) => [...ticketsAmount, amount]);
      let sub = subtotal;
      sub = sub + tickets.tickets[index].price;
      setSubtotal(sub);
      let fees = fee;
      fees = fees + tickets.tickets[index].fee;
      setFee(fees);
      let tot = sub + fees;
      setTotal(tot);
      calculateprice(sub, fees, tot);
    }
  }

  function removeamount(index) {
    if (ticketsAmount[index].number > 0) {
      let amount = ticketsAmount;
      amount[index].number = amount[index].number - 1;
      setTicketsAmount((ticketsAmount) => [...ticketsAmount, amount]);
      let sub = subtotal;
      sub = sub - tickets.tickets[index].price;
      setSubtotal(sub);
      let fees = fee;
      fees = fees - tickets.tickets[index].fee;
      setFee(fees);
      let tot =sub + fees;
      setTotal(tot);
      calculateprice(sub, fees, tot);
    }
  }

  return (
    <div className={classes.ticketscontainer}>
      <div className={classes.bookingheader}>
        <div id="modal-modal-title">{eventtitle}</div>
        <div className={classes.eventdate}> {date}</div>
      </div>
      <div className={classes.tickets}>
        {tickets.tickets.map((element, index) => {
          return (
            <div className={classes.singleticket}>
              <div className={classes.singleticketnamecontainer}>
                <div className={classes.singleticketname}>{element.name}</div>
                <div className={classes.addremoveticket}>
                  <div
                    className={
                      ticketsAmount[index].number == element.maxQuantityPerOrder
                        ? classes.addremove
                        : classes.addremoveactive
                    }
                    onClick={() => addamount(index)}>
                    <svg
                      id="plus-chunky_svg__eds-icon--plus-chunky_svg"
                      x="0"
                      y="0"
                      viewBox="0 0 24 24">
                      <path
                        id="plus-chunky_svg__eds-icon--plus-chunky_base"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13 11V4h-2v7H4v2h7v7h2v-7h7v-2z"></path>
                    </svg>
                  </div>
                  <div className={classes.ticketamount}>
                    {ticketsAmount[index].number}
                  </div>
                  <div
                    className={
                      ticketsAmount[index].number == 0
                        ? classes.addremove
                        : classes.addremoveactive
                    }
                    onClick={() => removeamount(index)}>
                    <svg
                      id="minus-chunky_svg__eds-icon-minus-chunky"
                      x="0"
                      y="0"
                      viewBox="0 0 24 24">
                      <g>
                        <path fill="#fff" d="M6.5 11.5h11v1h-11z"></path>
                        <path d="M18 11H6v2h12v-2z"></path>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className={classes.ticketsfooter}>
          <h3>powered by envie</h3>
        </div>
      </div>
    </div>
  );
};

export default TicketsDetails;
