import React from "react";
import { useState, useEffect } from "react";
import classes from "./tickets.module.css";
import { Link, useParams } from "react-router-dom";
import logo from "../../../../assets/brand/envie.svg";
import tickets from "../../../../assets/data/dummytickets";
import moment from "moment";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled } from "@mui/material/styles";
import axios from "../../../../requests/axios";
import routes from "../../../../requests/routes";

const TicketsDetails = ({ eventtitle, date, checkout, summary }) => {
  //   const filledArray = Array(tickets.tickets.length).fill(0);
  let filledArray = new Array(tickets.tickets.length)
    .fill()
    .map((element, index) => ({
      ticketClass: tickets.tickets[index]._id,
      number: 0,
      name: tickets.tickets[index].name,
      price: tickets.tickets[index].price,
      fee: tickets.tickets[index].fee,
      discountpercent: 0,
      discountamount: 0,
    }));

  let { _id } = useParams();

  //   const [ticketsAmount, setTicketsAmount] = useState(filledArray);
  const [ticketsAmount, setTicketsAmount] = useState(filledArray);
  const [promocode, setPromocode] = useState(false);
  const [subtotal, setSubtotal] = useState(0.0);
  const [fee, setFee] = useState(0.0);
  const [total, setTotal] = useState(0.0);
  const [inputValue, setInputValue] = useState("");
  const [ticketsNum, setTicketsNum] = useState(0);
  const [errorMsg, setErrorMsg] = useState(false);
  const [helper, setHelper] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    // do something when the button is clicked
  };

  const MyTextField = styled(TextField)({
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "grey",
    },
    "&:focus-within .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
      borderWidth: "2px",
    },
    "&:focus-within .MuiInputLabel-root": {
      color: "black",
    },
  });

  function addamount(index) {
    if (
      ticketsAmount[index].number < tickets.tickets[index].maxQuantityPerOrder
    ) {
      let amount = ticketsAmount;
      amount[index].number = amount[index].number + 1;
      setTicketsAmount(amount);

      let count = ticketsNum;
      count = count + 1;
      setTicketsNum(count);

      summary(amount, count);
    }
  }

  function removeamount(index) {
    if (ticketsAmount[index].number > 0) {
      let amount = ticketsAmount;
      amount[index].number = amount[index].number - 1;
      setTicketsAmount(amount);

      let count = ticketsNum;
      count = count - 1;
      setTicketsNum(count);

      summary(amount, count);
    }
  }

  const applypromocode = () => {
    async function sendpromo() {
      try {
        let data = { promocode: "Promo 1" };
        console.log(data);
        const response = await axios.get(
          routes.promocode + "/" + _id + "/checkPromo",
          { promocode: "Promo 1" }
        );
        console.log(response);
        setErrorMsg(false);
        setPromocode(response.data.promocode);
        let dis = 0;
        let percent = 0;
        let mount = 0;
        let type = "";
        if (response.data.promocode.percentOff != -1) {
          dis = response.data.promocode.percentOff;
          percent = dis;
          type = "%";
        } else {
          dis = response.data.promocode.amountOff;
          mount = dis;
          type = "$";
        }
        let text =
          response.data.promocode.name +
          " is Applied. A " +
          dis +
          type +
          " discount is Applied.";
        setHelper(text);

        let array = ticketsAmount;

        for (
          let index = 0;
          index < response.data.promocode.tickets.length;
          index++
        ) {
          let search = array.findIndex(
            (ticket) =>
              ticket.ticketClass == response.data.promocode.tickets[index]
          );
          array[search].discountpercent = percent;
          array[search].discountamount = mount;
        }

        setTicketsAmount(array);
        summary(array, ticketsNum);
      } catch (err) {
        setErrorMsg(true);
        setHelper("Sorry, we don’t recognise that code.");
      }


    }
    if (!promocode) {
      sendpromo();
    } else {
      let array = ticketsAmount;

      for (let index = 0; index < promocode.promocode.tickets.length; index++) {
        let search = array.findIndex(
          (ticket) => ticket.ticketClass == promocode.promocode.tickets[index]
        );
        array[search].discountpercent = 0;
        array[search].discountamount = 0;
      }

      setTicketsAmount(array);
      setPromocode(false);
      setHelper("");
      summary(array, ticketsNum);

    }
  };

  const handlecheckout = () => {
    if (ticketsNum == 0) {
      setErrorMsg(true);
      console.log("error");
    } else {
      checkout(promocode);
    }
  };

  return (
    <div className={classes.ticketscontainer}>
      <div className={classes.bookingheader}>
        <div id="modal-modal-title">{eventtitle}</div>
        <div className={classes.eventdate}> {date}</div>
      </div>

      <div className={classes.tickets}>
        <div className={classes.promocode}>
          <TextField
            className={classes.promocodebox}
            id="outlined-basic"
            label="PromoCode"
            variant="outlined"
            placeholder="Enter Code"
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {promocode && <CheckCircleIcon color="success" />}
                  <button
                    disabled={!promocode ? !inputValue : false}
                    onClick={applypromocode}
                    className={
                      !inputValue ? classes.applybtn : classes.applybtnactive
                    }>
                    {!promocode ? "Apply" : "Remove"}
                  </button>
                </InputAdornment>
              ),
            }}
            error={errorMsg}
            helperText={helper}
          />
        </div>

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
              <div className={classes.containerticketinfo}>
                <div className={classes.headercontainer}>
                  <p className={classes.price}>{element.price}</p>
                  <p className={classes.sales}>
                    sales end on{" "}
                    {moment(element.salesStart).format("MMMM Do YYYY")}
                  </p>
                </div>
                <div className={classes.aboutticket}>
                  <p className={classes.includedpr}>
                    WHAT IS INCLUDED IN YOUR TICKET?{" "}
                  </p>
                  {element.about && (
                    <ul className={classes.aboutsection}>
                      {element.about.map((item, index) => {
                        return (
                          <li className={classes.Detailsabout}>{item.name}</li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div className={classes.ticketsfooter}>
          <div>Powered by </div>
          <img className={classes.logo} src={logo} alt="logo" />
        </div>
      </div>
      <div className={classes.checkoutcontainer}>
        <div className={classes.summarycontainer}>{total}</div>
        <div className={classes.btn}>
          <button
            onClick={handlecheckout}
            className={classes.button}
            data-testid="CreateBtn">
            Check out
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketsDetails;
