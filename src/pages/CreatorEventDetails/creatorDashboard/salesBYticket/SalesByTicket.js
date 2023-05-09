import classes from "./salesbyticke.module.css";
import dashboarddata from "../../../../assets/data/dashboarddata";

/**
 * Component that returns table of sales by ticket type of Creator's Dashboard page
 *
 * @component
 * @example
 * return(<SalesByTicket salesReport={salesReport} is_paginated={true} handlePagination={handlePagination} />)
 */
const SalesByTicket = ({ salesReport, is_paginated, handlePagination }) => {
  return (
    <div
      id="CreatorDashBoardPageSalesByTicketContainer"
      className={classes.container}>
      <div
        id="CreatorDashBoardPageSalesByTicketHeader"
        className={classes.mainsectionheader}>
        Sales by ticket type
      </div>
      {salesReport.length !== 0 ? (
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
              {salesReport.map((item, index) => {
                return (
                  <tr
                    key={
                      "CreatorDashBoardPageSalesByTicketTableBodyRow" + index
                    }
                    id={
                      "CreatorDashBoardPageSalesByTicketTableBodyRow" + index
                    }>
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
      ) : null}

      <div
        id="CreatorDashBoardPageSalesByTicketHyperLink"
        className={classes.hyperlink}
        onClick={handlePagination}>
        {is_paginated ? "Go to all ticket sales" : "See Less"}
      </div>
    </div>
  );
};

export default SalesByTicket;
