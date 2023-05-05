import React, { useEffect, useState } from "react";
import classes from "./Ticketsmodal.module.css";
import { AiOutlineCheck } from "react-icons/ai";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TicketData from "../../assets/data/TicketData";

const ticketsmap = TicketData.Ticketsinfo;
const TicketModal = (props) => {
  const [stateofform, changestateofform] = useState(true);
  const handleClose = () => {
    changestateofform(false);
  };
  const [selectedall, setselectall] = useState(false);

  let n = ticketsmap[0].length;
  let myArray = Array(n)
    .fill()
    .map((element, index) => ({
      checked: 0,
    }));
  console.log(myArray);
  const [selected, setselected] = useState(myArray);
  let selectednum = 0;

  function selectall() {
    selectednum = n;
    if (selectedall == true) {
      let newselected = Array(n).fill(0);
      setselectall(!selectedall);
      setselected((selected) => [...selected, newselected]);
      console.log(selected);
    } else {
      setselectall(!selectedall);
      let newselected = Array(n).fill(1);
      setselected(newselected);
      console.log(selected);
    }
  }
  function handleClick(index) {
    console.log(selected);
    console.log(index);
    if (selected[index] == 0) {
      let newselected = selected;
      newselected[index] = 1;
      setselected(newselected);
      console.log(selected);
      selectednum = selectednum + 1;
    }
    if (selected[index] == 1) {
      let newselected = selected;
      newselected[index] = 0;
      setselected(newselected);
      console.log(selected);
    }
  }
  return (
    <Modal
      open={stateofform}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={classes.genericmodal}
    >
      <Box
        sx={{
          backgroundColor: "#f8f7fa",
          borderRadius: 1,
          width: "60%",
          maxWidth: 600,
          border: "0px",
          outline: "none",
        }}
      >
        <div className={classes.container}>
          <div className={classes.header}>Select Tickets</div>
          <div className={classes.staticheader}>
            <div
              className={!selectedall ? classes.radiobutton : classes.selected}
              onClick={selectall}
            >
              {selectedall ? (
                <>
                  <AiOutlineCheck className={classes.icon} size="13" />
                </>
              ) : null}
            </div>
            <div className={classes.staticheader2}>Ticket Type </div>
            <div className={classes.pricep}>Price</div>
          </div>
          <ul>
            {ticketsmap[0].map((element, index) => {
              return (
                <div className={classes.staticheaderticket}>
                  <div
                    className={
                      (selected[index] = 1
                        ? classes.radiobutton
                        : classes.selected)
                    }
                    onClick={() => handleClick(index)}
                  >
                    {
                      (selected[index] = 1 ? (
                        <>
                          <AiOutlineCheck className={classes.icon} />
                        </>
                      ) : null)
                    }
                  </div>
                  <div className={classes.staticheader2}>{element.name}</div>
                  <div className={classes.pricep}>{element.type}</div>
                </div>
              );
            })}
          </ul>
          <div className={classes.footer} onClick={handleClose}>
            <button>Done</button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
export default TicketModal;
