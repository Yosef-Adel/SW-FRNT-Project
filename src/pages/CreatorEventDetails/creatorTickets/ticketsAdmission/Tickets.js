import React from "react";
import AddTicketForm from "./addTicketForm/AddTicketForm";
import { useState, useEffect } from "react";
import tickets1 from "../../../../assets/data/dummytickets";
import TicketsView from "./ticketsListView/TicketsView";

export default function Tickets({empty, loading}) {
    const [dummydata, setdummydata] = useState(true);
    const [ticketlist, setticketlist] = useState(tickets1.tickets2);
  return <div>
    <AddTicketForm setdummydata={setdummydata} ticket={ticketlist} />
    <TicketsView empty={empty} isloading={loading} dummydata={dummydata} ticketsnew={setticketlist} />

  </div>;
}
