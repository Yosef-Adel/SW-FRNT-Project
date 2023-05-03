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
    <div
      id="CreatorDashBoardPageSalesByTicketContainer"
      className={classes.container}>
      <div
        id="CreatorDashBoardPageSalesByTicketHeader"
        className={classes.mainsectionheader}>
        Sales by ticket type
      </div>
      <div
        id="CreatorDashBoardPageSalesByTicketTableContainer"
        className={classes.salestable}>
        <table id="CreatorDashBoardPageSalesByTicketTable">
          <thead id="CreatorDashBoardPageSalesByTicketTableHead">
            <tr id="CreatorDashBoardPageSalesByTicketTableHeadRow">
              {dashboarddata.salesheader.map((item, index) => {
                return (
                  <td
                    key={
                      "CreatorDashBoardPageSalesByTicketTableHeadData" + index
                    }
                    id={
                      "CreatorDashBoardPageSalesByTicketTableHeadData" + index
                    }>
                    {item}
                  </td>
                );
              })}
            </tr>
          </thead>
          <tbody id="CreatorDashBoardPageSalesByTicketTableBody">
            {salesbyticket.salesReport.map((item, index) => {
              return (
                <tr
                  key={"CreatorDashBoardPageSalesByTicketTableBodyRow" + index}
                  id={"CreatorDashBoardPageSalesByTicketTableBodyRow" + index}>
                  <td id="CreatorDashBoardPageSalesByTicketTableBodyTicketType">
                    {item.ticketType}
                  </td>
                  <td id="CreatorDashBoardPageSalesByTicketTableBodyPrice">
                    {item.Price}
                  </td>
                  <td
                    id="CreatorDashBoardPageSalesByTicketTableBodySold"
                    className={classes.sold}>
                    {item.sold}/{item.total}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div
        id="CreatorDashBoardPageSalesByTicketHyperLink"
        className={classes.hyperlink}>
        Go to all ticket sales
      </div>
    </div>
  );
};

export default SalesByTicket;
