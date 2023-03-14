import React, { Component } from "react";
import classes from "./footer.module.css";
import FooterData from "../../assets/data/FooterData";

/**
 * Component that renders footer
 *
 * @component
 * @example
 * return(
 * <Footer />
 * )
 */

const Footer = (props) => {
  return (
    <div className={classes.footer}>
      <div className={classes.copyright}>
        <strong>© 2023 Envie</strong>
      </div>
      <div className={classes.footerdata}>
        {FooterData.staticData.map((element) => (
          <li className={classes.footeritem}>
            <div>{element}</div>
          </li>
        ))}
      </div>

      <div className={classes.dropdown}>
        <select>
          <option value="Egypt" selected>
            <strong>Egypt</strong>
          </option>
          {FooterData.countriesData.map((element) => (
            <option value={element} disabled>
              {element}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Footer;
