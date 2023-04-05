import React from "react";
import { useState, useEffect } from "react";

import classes from "./bookingpopup.module.css";
import { Link, useParams } from "react-router-dom";
import tickets from "../../../assets/data/dummytickets";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TicketsDetails from "./ticketsDetails/TicketsDetails";

const BookingPopup = ({ eventtitle }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={classes.bookingpopscontainer}>
      <div className={classes.btn}>
        <Button className={classes.button} onClick={handleOpen}>
          Get tickets
        </Button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        disableBackdropClick
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.bookingmodal}>
        <Box className={classes.bookingbox}>
          <div className={classes.bookingcontainer}>
            <div className={classes.ticketsformcontainer}>
              <TicketsDetails eventtitle={eventtitle} date="date" />
            </div>

            <div className={classes.summarycontainer}></div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default BookingPopup;
