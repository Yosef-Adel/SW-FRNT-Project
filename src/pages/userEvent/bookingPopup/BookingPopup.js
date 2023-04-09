import React from "react";
import { useState, useEffect } from "react";

import classes from "./bookingpopup.module.css";
import { Link, useParams } from "react-router-dom";
import tickets from "../../../assets/data/dummytickets";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TicketsDetails from "./ticketsDetails/TicketsDetails";

const BookingPopup = ({ eventtitle,date }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [subtotal, setSubtotal] = useState(0.0);
  const [fee, setFee] = useState(0.0);
  const [total, setTotal] = useState(0.0);

  function calculateprice(subtotal,fee,total) {
    setSubtotal(subtotal);
    setFee(fee);
    setTotal(total);
    // console.log(total)
  }

  return (
    <div className={classes.bookingpopscontainer}>
      <div className={classes.btn}>
        <Button className={classes.button} onClick={handleOpen}>
          Get tickets
        </Button>
      </div>

      <Modal
        open={open}
        // onClose={handleClose}
        disableBackdropClick
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.bookingmodal}>
        <Box className={classes.bookingbox}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          className={classes.bookingmodalclose}
        >
          <CloseIcon />
        </IconButton>
          <div className={classes.bookingcontainer}>
            <div className={classes.ticketsformcontainer}>
              <TicketsDetails eventtitle={eventtitle} date={date} calculateprice={calculateprice} />
            </div>

            <div className={classes.summarycontainer}>
              {total}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default BookingPopup;
