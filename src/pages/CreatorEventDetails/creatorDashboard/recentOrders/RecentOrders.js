import classes from "../salesBYticket/salesbyticke.module.css";
import dashboarddata from "../../../../assets/data/dashboarddata";
import moment from "moment";

/**
 * Component that returns table of recent orders of Creator's Dashboard page
 *
 * @component
 * @example
 * return(<RecentOrders />)
 */
const RecentOrders = ({ recentordersReport }) => {
  return (
    <div
      id="CreatorDashBoardPageSalesRecentOrdersContainer"
      className={classes.container}>
      <div
        id="CreatorDashBoardPageSalesRecentOrdersHeader"
        className={classes.mainsectionheader}>
        Recent Orders
      </div>
      {recentordersReport.length !== 0 ? (
        <div
          id="CreatorDashBoardPageSalesRecentOrdersTableContainer"
          className={classes.salestable}>
          <table id="CreatorDashBoardPageSalesRecentOrdersTable">
            <thead id="CreatorDashBoardPageSalesRecentOrdersTableHead">
              <tr id="CreatorDashBoardPageSalesRecentOrdersTableHeadRow">
                {dashboarddata.recentordersheader.map((item, index) => {
                  return (
                    <td
                      key={
                        "CreatorDashBoardPageSalesRecentOrdersTableHeadRow" +
                        index
                      }
                      id={
                        "CreatorDashBoardPageSalesRecentOrdersTableHeadRow" +
                        index
                      }>
                      {item}
                    </td>
                  );
                })}
              </tr>
            </thead>
            <tbody id="CreatorDashBoardPageSalesRecentOrdersTableBody">
              {recentordersReport.map((item, index) => {
                return (
                  <tr
                    key={
                      "CreatorDashBoardPageSalesRecentOrdersTableBodyRow" +
                      index
                    }
                    id={
                      "CreatorDashBoardPageSalesRecentOrdersTableBodyRow" +
                      index
                    }>
                    <td
                      id={
                        "CreatorDashBoardPageSalesRecentOrdersTableBodyDataOrderNum" +
                        index
                      }
                      className={classes.sold}>
                      {item.orderNumber}
                    </td>
                    <td
                      id={
                        "CreatorDashBoardPageSalesRecentOrdersTableBodyDataName" +
                        index
                      }>
                      {item.name}
                    </td>
                    <td
                      id={
                        "CreatorDashBoardPageSalesRecentOrdersTableBodyDataQuantity" +
                        index
                      }>
                      {item.quantity}
                    </td>
                    <td
                      id={
                        "CreatorDashBoardPageSalesRecentOrdersTableBodyDataPrice" +
                        index
                      }>
                      {item.price}
                    </td>
                    <td
                      id={
                        "CreatorDashBoardPageSalesRecentOrdersTableBodyDataDate" +
                        index
                      }>
                      {moment(item.date).format("L")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}

      <div
        id="CreatorDashBoardPageSalesRecentOrdersHyperLink"
        className={classes.hyperlink}>
        Go to all orders
      </div>
    </div>
  );
};

export default RecentOrders;
