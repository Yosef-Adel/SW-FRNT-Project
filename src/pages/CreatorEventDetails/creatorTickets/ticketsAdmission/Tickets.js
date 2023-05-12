import React from "react";
import AddTicketForm from "./addTicketForm/AddTicketForm";
import { useState, useEffect } from "react";
import tickets1 from "../../../../assets/data/dummytickets";
import TicketsView from "./ticketsListView/TicketsView";

export default function Tickets({empty, isempty, loading , isloading}) {
    const [dummydata, setdummydata] = useState(true);
    const [ticketlist, setticketlist] = useState(tickets1.tickets2);
  return <div>
    <AddTicketForm setdummydata={setdummydata} ticket={ticketlist} isempty={isempty} isloading = {isloading} />
    <TicketsView empty={empty} isloading={loading} dummydata={dummydata} ticketsnew={setticketlist} />

  </div>;
}
