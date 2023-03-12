import React from "react";
import classes from "./footer.module.css";
import FooterData from "../../assets/data/FooterData";

/**
 * Component that renders nav bar
 *
 * @component
 */
const Footer = (props) => {
  return (
    <div className={classes.footer}>
      <div className={classes.copyright}>
        <div>© 2023 Envie</div>
      </div>
      <div className={classes.footerdata}>
        {FooterData.map((element) => (
          <li className={classes.footeritem}>
            <div>{element}</div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Footer;
