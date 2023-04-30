import classes from "../salesBYticket/salesbyticke.module.css";
import dashboarddata from "../../../../assets/data/dashboarddata";
import salesbyticket from "../../../../assets/data/dummysalesbyticket";
import moment from "moment";

/**
 * Component that returns table of sales by ticket type of Creator's Dashboard page
 *
 * @component
 * @example
 * return(<RecentOrders />)
 */
const RecentOrders = () => {
  return (
    <div className={classes.container}>
      <div className={classes.mainsectionheader}>Recent Orders</div>
      <div className={classes.salestable}>
        <table>
          <thead>
            <tr>
              {dashboarddata.recentordersheader.map((item) => {
                return <td>{item}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {salesbyticket.recentordersReport.map((item) => {
              return <tr>
                <td className={classes.sold}>{item.orderNumber}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{moment(item.date).format('L')}</td>
              </tr>;
            })}
          </tbody>
        </table>
      </div>
      <div className={classes.hyperlink}>Go to all orders</div>
    </div>
  );
};

export default RecentOrders;
