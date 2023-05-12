import React from "react";
import AddTicketForm from "./addTicketForm/AddTicketForm";
import { useState, useEffect } from "react";
import tickets1 from "../../../../assets/data/dummytickets";
import TicketsView from "./ticketsListView/TicketsView";
import initialValues from "../../../../assets/data/initialValues";

export default function Tickets({empty, isempty, loading , isloading}) {
    const [dummydata, setdummydata] = useState(true);
    const [ticketlist, setticketlist] = useState(tickets1.tickets2);
    const [modalopen, setticketsmodalopen] = useState(false);
    const[tickets,setticketsmodal]=useState(tickets1.tickets2);
    const[allticketmodal,setallticketmodal]=useState(false);
    const[index,setindex]=useState(-1);
    const[editform,seteditform]=useState(false);
    const[initialvalues,setintialvalues]=useState(initialValues);
  return <div>
    <AddTicketForm setdummydata={setdummydata} ticket={ticketlist} isempty={isempty} isloading = {isloading} setallticketmodal={setallticketmodal} openmodal={allticketmodal} index={index} seteditform={seteditform} editform={editform} Initialvalues={initialvalues} setintialvalues={setintialvalues} />
    <TicketsView  setallticketmodal={setallticketmodal} empty={empty} isloading={loading} dummydata={dummydata} ticketsnew={setticketlist} setindex={setindex} seteditform={seteditform} />

  </div>;
}
