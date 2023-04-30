import classes from "./salesbyticke.module.css";
import salesbyticket from "../../../../assets/data/dummysalesbyticket";
import dashboarddata from "../../../../assets/data/dashboarddata";

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
              {dashboarddata.salesheader.map((item) => {
                return <td>{item}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {salesbyticket.salesReport.map((item) => {
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
