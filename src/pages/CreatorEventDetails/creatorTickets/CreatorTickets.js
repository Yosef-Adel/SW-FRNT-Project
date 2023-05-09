import classes from "./tickets.module.css";
import GenericFilterTabs from "../../../generic components/generic filter/GenericFilterTabs";
import TicketsModal from "../../../generic components/ticketsModal/TicketsModal";
import TicketsFilterTabs from "../../../assets/data/TicketsFilterTabs";
import { useState, useEffect } from "react";
import * as React from "react";
import AddTicketForm from "./ticketsAdmission/addTicketForm/AddTicketForm";
import AddPromocodeForm from "./tickestPromocodes/addPromoCodeForm/AddPromocodeForm";
import PromoCodesList from "./tickestPromocodes/promocodesListView/PromoCodesList";
import TicketsView from "./ticketsAdmission/ticketsListView/TicketsView";
import tickets1 from "../../../assets/data/dummytickets";
import TicketModal from "../../../generic components/ticketsModal/TicketsModal";
/**
 * Component that returns Creator's Manage Tickets page
 *
 * @component
 * @example
 * return(<CreatorTickets />)
 */

const CreatorTickets = ({ eventID }) => {
  const [addmisionclicked, setAddmisionclicked] = useState(true);
  const [ticketlist, setticketlist] = useState(tickets1.tickets2);
  const [dummydata, setdummydata] = useState(true);
  const [modalopen, setticketsmodalopen] = useState(false);
  const[tickets,setticketsmodal]=useState(tickets1.tickets2)
  function handleClickedItem(i) {
    if (i === 2) {
      setAddmisionclicked(false);
    } else {
      setAddmisionclicked(true);
    }
  }

  return (
    <div className={classes.whole}>
      <div className={classes.container}>
        <p className={classes.ticketp}>Tickets</p>
        <GenericFilterTabs
          FilterTabsData={TicketsFilterTabs}
          clickedItem={handleClickedItem}
        />
        {addmisionclicked ? (
          <AddTicketForm setdummydata={setdummydata} ticket={ticketlist} />
        ) : (
          <AddPromocodeForm edit={false} ticketsselected={tickets} setmodalopen={setticketsmodalopen} />
        )}
        {addmisionclicked ? (
          <TicketsView dummydata={dummydata} ticketsnew={setticketlist} />
        ) : (
          <PromoCodesList />
        )}
        <TicketModal
          tickets={ticketlist}
          modalopen={modalopen}
          setticketsmodalopen={setticketsmodalopen}
          ticketsmodal={setticketsmodal}
        />
      </div>
    </div>
  );
};

export default CreatorTickets;
