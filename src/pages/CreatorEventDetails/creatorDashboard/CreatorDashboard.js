import DashboardCards from "./DashboardCards/DashBoardCards";
import SalesByTicket from "./salesBYticket/SalesByTicket";
import classes from "./dashboard.module.css";
import dashboarddata from "../../../assets/data/dashboarddata";
import { FaFacebookF } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

/**
 * Component that returns Creator's Dashboard page
 *
 * @component
 * @example
 * return(<CreatorDashboard />)
 */
const CreatorDashboard = () => {
  return (
    <div className={classes.container}>
      <div className={classes.dashboard}>
        <div className={classes.header}>Dashboard</div>
        <div className={classes.content}>
          <div className={classes.cards}>
            <DashboardCards title="Tickets Sold" amount="7" total="30" />
            <DashboardCards title="Page Views" amount="4" total={false} />
          </div>
          <div className={classes.recommended}>
            <div className={classes.secsectionheader}>Recommended</div>
            <div className={classes.reclistContainer}>
              {dashboarddata.recommended.map((item) => {
                return (
                  <li key={item.key} className={classes.recitemContainer}>
                    <div className={classes.iconContainer}> {item.icon}</div>
                    <div className={classes.reclistdata}>
                      <div className={classes.reclistdtitle}>{item.title}</div>
                      <div className={classes.hyperlink}>{item.hyperlink}</div>
                    </div>
                  </li>
                );
              })}
            </div>
          </div>
        </div>
        <div className={classes.share}>
          <div className={classes.mainsectionheader}>Share</div>
          <div className={classes.content}>
            <div className={classes.eventurl}>
              <div className={classes.eventurlheader}>Event URL</div>
              <div className={classes.url}>
                https://www.eventbrite.com/e/the-design-show-egypt-tickets-372686233557?aff=ebdssbcitybrowse
              </div>
            </div>

            <div className={classes.shareicons}>
              <div className={classes.thirsectionheader}>Share On</div>
              <ul>
                <li>
                  <FaFacebookF className={classes.shareIcon} />
                </li>
                <li>
                  <FaFacebookMessenger className={classes.shareIcon} />
                </li>
                <li>
                  <FaTwitter className={classes.shareIcon} />
                </li>
                <li>
                  <MdEmail className={classes.shareIcon} />
                </li>
                <li>
                  <FaLinkedinIn className={classes.shareIcon} />
                </li>
                <li>
                  <FaWhatsapp className={classes.shareIcon} />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr />

        <div className={classes.content}>
          <SalesByTicket />
          <div className={classes.recommended}>
            <div className={classes.thirsectionheader}>
              Other Attendee Actions
            </div>
            <div className={classes.reclistContainer}>
              {dashboarddata.attendee.map((item) => {
                return (
                  <li key={item.key} className={classes.recitemContainer}>
                    <div className={classes.acticonContainer}> {item.icon}</div>
                    <div className={classes.reclistdata}>
                      <Link to={"/"}>
                        <div className={classes.hyperlink}>
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
      </div>
    </div>
  );
};

export default CreatorDashboard;
