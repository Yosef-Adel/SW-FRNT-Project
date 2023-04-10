import classes from "./genericModal.module.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {BiInfoCircle} from "react-icons/bi"
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { maxWidth } from "@mui/system";
import { Icon } from "@mui/material";

const GenericModal = (props) => {
  const[statebtn,changestatebtn]=useState(true);
  const handleClose = () => {
    changestatebtn(false);
  };
  return (
  
       <Modal
        open={statebtn}
        // onClose={handleClose}
        // disableBackdropClick
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.genericmodal}>
        <Box   sx={{backgroundColor: '#e2e1e6;',borderRadius: 1,width:'70%',maxWidth:800,border:'0px',outline:'none'}} >
            <div className={classes.info}>
                <IconButton 
                  aria-label="close"
                  onClick={() => {handleClose()}}
                  className={classes.modalclose}>
                  <CloseIcon className={classes.btnclose}/>
                </IconButton>
                <div className={classes.iconcontainer}>
                  {props.icon}
                </div>
              <div className={classes.infoheader}>
                <h1>{props.header}</h1> 
                <p>{props.details}</p>
              </div>
              <div className={classes.modalbuttons}>
              {props.rejectbtn && (
                <div className={classes.btncontainer}>
                  <button className={classes.staybutton} onClick={props.rejecthandle}>
                    {props.rejectbtn}
                  </button>
                </div>
              )}
              {props.confirmbtn &&(
                  <div className={classes.btncontainer}>
                  <button className={classes.leavebutton} onClick={props.accepthandle}>
                    {props.confirmbtn}
                  </button>
                </div>
                )}
               
              </div>
            </div>
        </Box>
      </Modal>
  );
};

export default GenericModal;
