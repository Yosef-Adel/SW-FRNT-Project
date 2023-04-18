import React from "react";
import { useState, useEffect } from "react";
import classes from "./tickets.module.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import logo from "../../../../assets/brand/envie.svg";
// import tickets from "../../../../assets/data/dummytickets";
import moment from "moment";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled } from "@mui/material/styles";
import axios from "../../../../requests/axios";
import routes from "../../../../requests/routes";
import { useSelector } from "react-redux";
import GenericModal from "../../../../generic components/generic modal/GenericModal";
import { GrLogin } from "react-icons/gr";
import ErrorNotification from "../../../../generic components/error message/ErrorNotification";

import { MdKeyboardArrowDown } from "react-icons/md";

/**
 * Component that renders tickets details
 * 
 * @component
 * @example
 * return(<TicketsDetails
                  eventtitle="event name"
                  date="date"
                  calculateprice={calculateprice}
                  checkout={checkout}
                  summary={ordersumm}
                  setOpenSummary={setOpenSummary}
                  openSummary={openSummary}
                  total={total}
                />)
*/

const TicketsDetails = ({
  eventtitle,
  date,
  checkout,
  summary,
  setOpenSummary,
  openSummary,
  total,
}) => {
  //   const filledArray = Array(tickets.tickets.length).fill(0);

  let { _id } = useParams();
  const navigate = useNavigate();
  //   const [ticketsAmount, setTicketsAmount] = useState(filledArray);
  const [tickets, setTickets] = useState(false);
  const [ticketsAmount, setTicketsAmount] = useState([]);
  const [promocode, setPromocode] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [ticketsNum, setTicketsNum] = useState(0);
  const [errorMsg, setErrorMsg] = useState(false);
  const [helper, setHelper] = useState("");
  const [logginform, setloginform] = useState(false);
  const [errorMsg1, setErrorMsg1] = useState("");
  const [errorLink, setErrorLink] = useState("");
  const [errorLinkMsg, setErrorLinkMsg] = useState("");

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

  /**
   * function that is triggered to get tickets
   * @function getTickets

   */

  async function getTickets() {
    try {
      const response = await axios.get(
        routes.tickets + "/" + _id + "/availableTickets"
      );

      setTickets(response.data);

      let filledArray = new Array(response.data.tickets.length)
        .fill()
        .map((element, index) => ({
          ticketClass: response.data.tickets[index]._id,
          number: 0,
          name: response.data.tickets[index].name,
          price: response.data.tickets[index].price,
          fee: response.data.tickets[index].fee,
          discountpercent: 0,
          discountamount: 0,
          discount: false,
        }));

      setTicketsAmount(filledArray);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getTickets();
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  /**
   * function that is triggered to add ticket
   * @function addamount
   * @param {number} index  index of the ticket

   */

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

  /**
   * function that is triggered to remove ticket
   * @function removeamount
   * @param {number} index  index of the ticket

   */

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

  /**
   * function that is triggered to apply promocode
   * @function applypromocode

   */
  const applypromocode = () => {
    async function sendpromo() {
      try {
        const response = await axios.get(
          routes.promocode + "/" + _id + "/" + inputValue + "/checkPromo"
        );
        // console.log(response);
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
          // console.log(search);
          // console.log(array[search]);
          if (search >= 0) {
            array[search].discountpercent = percent;
            array[search].discountamount = mount;
            array[search].discount = true;
          }
        }

        setTicketsAmount(array);
        summary(array, ticketsNum);
      } catch (err) {
        // console.log(err);
        setErrorMsg(true);
        setHelper("Sorry, we don’t recognise that code.");
      }
    }
    if (!promocode) {
      sendpromo();
    } else {
      let array = ticketsAmount;

      for (let index = 0; index < promocode.tickets.length; index++) {
        let search = array.findIndex(
          (ticket) => ticket.ticketClass == promocode.tickets[index]
        );
        if (search >= 0) {
          array[search].discountpercent = 0;
          array[search].discountamount = 0;
          array[search].discount = false;
        }
      }

      setTicketsAmount(array);
      setPromocode(false);
      setHelper("");
      summary(array, ticketsNum);
      setInputValue("");
    }
  };
  const user = useSelector((state) => state.user);
  const handlecheckout = () => {
    setloginform(false);
    const userloggedin = user.loggedIn;
    if (ticketsNum != 0) {
      if (userloggedin) {
        checkout(promocode);
      } else {
        setloginform(true);
      }
    } else {
      setErrorMsg1("please take at least 1 ticket");
    }
  };
  const loginhandle = () => {
    navigate("/login");
  };

  return (
    tickets != false && (
      <div className={classes.ticketscontainer}>
        <div className={classes.bookingheader}>
          <div id="modal-modal-title">{eventtitle}</div>
          <div className={classes.eventdate}> {date}</div>
        </div>

        <div className={classes.tickets}>
          <div className={classes.promocode}>
            <div className={classes.errm}>
              {errorMsg1 ? (
                <ErrorNotification
                  mssg={errorMsg1}
                  linkmsg={errorLinkMsg}
                  link={errorLink}
                />
              ) : null}
            </div>
            <TextField
              value={inputValue}
              disabled={promocode ? true : false}
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
                        ticketsAmount[index].number ==
                        element.maxQuantityPerOrder
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
                    {!ticketsAmount[index].discount && (
                      <p className={classes.price}>{element.price}</p>
                    )}
                    {ticketsAmount[index].discount && (
                      <pre>
                        <p className={classes.price}>
                          {element.price -
                            element.price *
                              ticketsAmount[index].discountpercent -
                            ticketsAmount[index].discountamount}
                          {"  "}
                          <del>{element.price}</del>
                        </p>
                      </pre>
                    )}
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
                            <li className={classes.Detailsabout}>
                              {item.name}
                            </li>
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
          <div className={classes.summarycontainer}>
            {" "}
            <MdKeyboardArrowDown
              className={openSummary ? classes.upArrow : classes.downArrow}
              onClick={() => {
                setOpenSummary(!openSummary);
              }}
            />{" "}
            {total}
          </div>
          <div className={classes.btn}>
            <button
              onClick={handlecheckout}
              className={classes.button}
              data-testid="checkoutBtn">
              Check out
            </button>
          </div>
        </div>
        {logginform && (
          <GenericModal
            header="Please login first"
            confirmbtn="Login"
            icon={<GrLogin className={classes.modalicon} />}
            accepthandle={loginhandle}
          />
        )}
      </div>
    )
  );
};

export default TicketsDetails;
