import React from "react";
import { useState, useEffect } from "react";
import classes from "./ticketsview.module.css";

const TicketsView = (props) => {
  return (
    <div>
      <div className={classes.ticketinfo}>
        <div>
          <p>Copy of Free ticket 1</p>
          <ul>
            <li>Ended Apr 13,2023 at 7:00 PM</li>
          </ul>
        </div>
        <div>
          <p>7/30</p>
        </div>
        <div>
          <p>Free</p>
        </div>
        <div></div>
      </div>
      <div>
        <div>
          <p> Event capacity</p>
        </div>
        <div>
          <p>
            {props.ticketstaked}/{props.capacity}
          </p>
        </div>
        <div>
          <button>Edit capacity</button>
        </div>
      </div>
    </div>
  );
};

export default TicketsView;
