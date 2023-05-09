import React from "react";
import { useState, useEffect } from "react";
import classes from "./promocodelist.module.css";
import axios from "../../../../../requests/axios";
import routes from "../../../../../requests/routes";
import data from "../../../../../assets/data/dummyData";
import tableheader from "../../../../../assets/data/promocodes";
import moment from "moment";

const PromoCodesList = ({ eventID }) => {
  const [promocodes, setPromocodes] = useState(data.promocodes);
  const now = moment();

  /**
     * function that is triggered to get list of promocodes
     * @function getPromoCodes

     */
  async function getPromoCodes() {
    try {
      const response = await axios.get(routes.promocode + "/" + eventID);
      setPromocodes(response.data.promocodes);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getPromoCodes();
  }, []);

  return (
    <div
      id="CreatorTicketsPagePromoCodesContainer"
      className={classes.container}>
      {promocodes.length !== 0 ? (
        <div
          id="CreatorTicketsPagePromoCodesTableContainer"
          className={classes.salestable}>
          <table id="CreatorTicketsPagePromoCodesTable">
            <thead id="CreatorTicketsPagePromoCodesTableHead">
              <tr
                className={classes.tableheader}
                id="CreatorTicketsPagePromoCodesTableHeadRow">
                {tableheader.header.map((item, index) => {
                  return (
                    <td
                      key={"CreatorTicketsPagePromoCodesTableHeadData" + index}
                      id={"CreatorTicketsPagePromoCodesTableHeadData" + index}
                      className={classes.tableheaderitem}>
                      {item}
                    </td>
                  );
                })}
                <td className={classes.tableheaderitemempty}></td>
              </tr>
            </thead>
            <tbody id="CreatorTicketsPagePromoCodesTableBody">
              {promocodes.map((item, index) => {
                return (
                  <tr
                    key={"CreatorTicketsPagePromoCodesTableBodyRow" + index}
                    id={"CreatorTicketsPagePromoCodesTableBodyRow" + index}
                    className={classes.tablebodyrow}>
                    <td id="CreatorTicketsPagePromoCodesTableBodypromoname">
                      {item.name}
                    </td>
                    <td id="CreatorTicketsPagePromoCodesTableBodypromotype">
                      Applies discount
                    </td>
                    <td id="CreatorTicketsPagePromoCodesTableBodypromodiscount">
                      {item.amountOff == -1
                        ? item.percentOff + " %"
                        : "E£ " + item.amountOff}
                    </td>
                    <td id="CreatorTicketsPagePromoCodesTableBodypromouses">
                      {item.used + " / " + item.limit}
                    </td>
                    <td id="CreatorTicketsPagePromoCodesTableBodypromostatus">
                      <div className={classes.status}>
                        <div
                          className={
                            now.diff(moment(item.endDate)) > 0
                              ? classes.statusicon
                              : classes.statusiconactive
                          }></div>
                        {now.diff(moment(item.endDate)) > 0 ? (
                          <div className={classes.statusdesc}>
                            <div>Ended</div>
                            <div className={classes.statustitle}>
                              Event has ended
                            </div>
                          </div>
                        ) : (
                          <div className={classes.statusdesc}>
                            <div>Active</div>
                            <div className={classes.statustitle}>
                              Ends:{moment(item.endDate).format("ll")}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default PromoCodesList;
