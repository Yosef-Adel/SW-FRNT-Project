import DashboardCards from "./DashboardCards/DashBoardCards";
import classes from "./dashboard.module.css";
import dashboarddata from "../../../assets/data/dashboarddata";
import salesbyticket from "../../../assets/data/dummysalesbyticket";
import { FaFacebookF } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import SalesCards from "./salesCards/SalesCards";
import SalesByTicket from "./salesBYticket/SalesByTicket";
import RecentOrders from "./recentOrders/RecentOrders";

/**
 * Component that returns Creator's Dashboard page
 *
 * @component
 * @example
 * return(<CreatorDashboard />)
 */
const CreatorDashboard = () => {
  return (
    <div id="CreatorDashBoardPageContainer" className={classes.container}>
      <div id="CreatorDashBoardContainer" className={classes.dashboard}>
        <div id="CreatorDashBoardPageHeader" className={classes.header}>
          Dashboard
        </div>
        <div
          id="CreatorDashBoardPagestSectionContent"
          className={classes.content}>
          <div
            id="CreatorDashBoardPageCardsContainer"
            className={classes.cards}>
            <DashboardCards
              title="Tickets Sold"
              amount="7"
              total="30"
              free="3"
              paid="4"
            />
            <DashboardCards
              title="Page Views"
              amount="4"
              total={false}
              free={false}
              paid={false}
            />
          </div>
          <div
            id="CreatorDashBoardPageRecommendedContainer"
            className={classes.recommended}>
            <div
              id="CreatorDashBoardPageRecommendedHeader"
              className={classes.secsectionheader}>
              Recommended
            </div>
            <div
              id="CreatorDashBoardPageRecommendedList"
              className={classes.reclistContainer}>
              {dashboarddata.recommended.map((item, index) => {
                return (
                  <li
                    id={"CreatorDashBoardPageRecommendedListItem" + index}
                    key={item.key}
                    className={classes.recitemContainer}>
                    <div
                      id={
                        "CreatorDashBoardPageRecommendedListItemIconContainer" +
                        index
                      }
                      className={classes.iconContainer}>
                      {item.icon}
                    </div>
                    <div
                      id={"CreatorDashBoardPageRecommendedListItemData" + index}
                      className={classes.reclistdata}>
                      <div
                        id={
                          "CreatorDashBoardPageRecommendedListItemTitle" + index
                        }
                        className={classes.reclistdtitle}>
                        {item.title}
                      </div>
                      <div
                        id={
                          "CreatorDashBoardPageRecommendedListItemHyperLink" +
                          index
                        }
                        className={classes.hyperlink}>
                        {item.hyperlink}
                      </div>
                    </div>
                  </li>
                );
              })}
            </div>
          </div>
        </div>
        <div id="CreatorDashBoardPageShareContainer" className={classes.share}>
          <div
            id="CreatorDashBoardPageShareHeader"
            className={classes.mainsectionheader}>
            Share
          </div>
          <div
            id="CreatorDashBoardPagendSectionContent"
            className={classes.content}>
            <div
              id="CreatorDashBoardPageShareURLContainer"
              className={classes.eventurl}>
              <div
                id="CreatorDashBoardPageShareURLHeader"
                className={classes.eventurlheader}>
                Event URL
              </div>
              <div id="CreatorDashBoardPageShareURL" className={classes.url}>
                https://www.eventbrite.com/e/the-design-show-egypt-tickets-372686233557?aff=ebdssbcitybrowse
              </div>
            </div>

            <div
              id="CreatorDashBoardPageShareIconsContainer"
              className={classes.shareicons}>
              <div
                id="CreatorDashBoardPageShareIconsHeader"
                className={classes.thirsectionheader}>
                Share On
              </div>
              <ul id="CreatorDashBoardPageShareIconsListContainer">
                <li id="CreatorDashBoardPageShareIconFaceBookContainer">
                  <FaFacebookF className={classes.shareIcon} />
                </li>
                <li id="CreatorDashBoardPageShareIconMessengerContainer">
                  <FaFacebookMessenger className={classes.shareIcon} />
                </li>
                <li id="CreatorDashBoardPageShareIconTwitterContainer">
                  <FaTwitter className={classes.shareIcon} />
                </li>
                <li id="CreatorDashBoardPageShareIconEmailContainer">
                  <MdEmail className={classes.shareIcon} />
                </li>
                <li id="CreatorDashBoardPageShareIconLinkedinContainer">
                  <FaLinkedinIn className={classes.shareIcon} />
                </li>
                <li id="CreatorDashBoardPageShareIconWhatsappContainer">
                  <FaWhatsapp className={classes.shareIcon} />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr />

        <div id="CreatorDashBoardPageSalesContainer">
          <div
            id="CreatorDashBoardPageSalesHeader"
            className={classes.mainsectionheader}>
            Sales Summary
          </div>

          <div
            id="CreatorDashBoardPageSalesCardsContainer"
            className={classes.salescards}>
            <SalesCards
              title="Gross Sales"
              amount={salesbyticket.sales.grossSales}
            />
            <SalesCards
              title="Net Sales"
              amount={salesbyticket.sales.netSales}
            />
            <SalesCards
              title="Tickets + Add-Ons Sold"
              amount={salesbyticket.sales.totalSoldTickets}
            />
            <SalesCards
              title="Orders"
              amount={salesbyticket.sales.totalOrders}
            />
          </div>
          <div
            id="CreatorDashBoardPageSalesContent"
            className={classes.content}>
            <SalesByTicket />
            <div
              id="CreatorDashBoardPageSalesHyperlinksContainer"
              className={classes.recommended}>
              <div
                id="CreatorDashBoardPageSalesHyperlinksHeader"
                className={classes.thirsectionheader}>
                Other Attendee Actions
              </div>
              <div
                id="CreatorDashBoardPageSalesHyperlinks"
                className={classes.reclistContainer}>
                {dashboarddata.attendee.map((item, index) => {
                  return (
                    <li
                      id={"CreatorDashBoardPageSalesHyperlink" + index}
                      key={item.key}
                      className={classes.recitemContainer}>
                      <div
                        id={"CreatorDashBoardPageSalesHyperlinkIcon" + index}
                        className={classes.acticonContainer}>
                        {item.icon}
                      </div>
                      <div
                        id={
                          "CreatorDashBoardPageSalesHyperlinkTitleContainer" +
                          index
                        }
                        className={classes.reclistdata}>
                        <Link
                          id={
                            "CreatorDashBoardPageSalesHyperlinkTitleLink" +
                            index
                          }
                          to={"/"}>
                          <div
                            id={
                              "CreatorDashBoardPageSalesHyperlinkTitle" + index
                            }
                            className={classes.hyperlink}>
                            {item.hyperlink}
                          </div>
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </div>
            </div>
          </div>
          <div
            id="CreatorDashBoardPageSalesRecentOrdersContent"
            className={classes.content}>
            <RecentOrders />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;
