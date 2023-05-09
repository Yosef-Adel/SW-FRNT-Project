import classes from "./addAttendee.module.css";
import React,{useEffect, useState} from "react";
import ErrorNotification from "../../../generic components/error message/ErrorNotification";

/**
 * Component that returns Creator's Add Attendee page
 *
 * @component
 * @example
 * return(<CreatorAddAttendee />)
 */


const TicketsRowComponent = (props) => {
    const [faceValue,setfaceValue] = useState(0);
    const [Quantity,setQuantity] = useState(0);
    const [Price,setPrice]=useState(props.price);
    // Quantity!==null&&props.index!==null && props.price!==null &&console.log("Ticket type["+props.index+"] price:"+props.price+"And its face value is:"+faceValue);
    useEffect(() => {setQuanArr();setfaceValue(Price*Quantity)}, [Quantity]);
    useEffect(() => {
        const newfaceValues = [...props.faceValues];
        newfaceValues[props.index] = faceValue;
        props.setfaceValues(newfaceValues);
    }, [faceValue]);

    function setQuanArr () {
        const newQuantityArr = [...props.QuantityArr];
        newQuantityArr[props.index] = Quantity;
        props.setQuantityArr(newQuantityArr);
    }
  return (
        <tr className={classes.datarow}>
          <td className={classes.tabledata}>{props.name}</td>
          <td className={classes.tabledata}>{props.sold}/{props.capacity}</td>
          <td className={classes.tabledata}>${Price}.00</td>
          <td className={classes.tabledata}>
            <div className={classes.fieldContainer}>
          <input id={"Q"+props.index} className={classes.field} onChange={function func(e) {
      ((e.target.value>=props.minQuantityPerOrder && e.target.value<=props.maxQuantityPerOrder)?setQuantity(e.target.value):setQuantity(0));
      setfaceValue(Quantity*Price);}}placeholder={Quantity}></input>
            </div>
          </td>
          <td className={classes.tabledata}>
            <div className={classes.fieldContainer}>
                  <label className={classes.label}>$</label>
                  <input className={classes.faceValuefield} onChange={function func(e)  {
            setfaceValue(e.target.value);
          }}></input>
                <p className={classes.faceValuetext}>{faceValue}</p>
            </div>
          </td>
        </tr>
    );
  };

export default TicketsRowComponent;
