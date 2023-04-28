import classes from "./salesbyticke.module.css";
import salesbyticket from "../../../../assets/data/dummysalesbyticket";

/**
 * Component that returns table of sales by ticket type of Creator's Dashboard page
 *
 * @component
 * @example
 * return(<SalesByTicket />)
 */
const SalesByTicket = () => {
  return (
    <div className={classes.container}>
      <div className={classes.mainsectionheader}>Sales by ticket type</div>
      <div className={classes.salestable}>
        <table>
          <thead>
            <tr>
              {salesbyticket.header.map((item) => {
                return <td>{item}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {salesbyticket.Report.map((item) => {
              return <tr>
                <td>{item.ticketType}</td>
                <td>{item.Price}</td>
                <td className={classes.sold}>{item.sold}/{item.total}</td>
              </tr>;
            })}
          </tbody>
        </table>
      </div>
      <div className={classes.hyperlink}>Go to all ticket sales</div>
    </div>
  );
};

export default SalesByTicket;
