import classes from "./publish.module.css";
import CreatorEventCard from "./eventCard/CreatorEventCard";
import image from "../../../assets/imgs/events/event1.png"
import { Formik, Form, Field, ErrorMessage } from "formik";


/**
 * Component that returns Creator's Publish Event page
 *
 * @component
 * @example
 * return(<CreatorPublish />)
 */
const CreatorPublish = () => {

  const initialValues = {
    isPrivate: "",
    publishDate: "",
  };

  const tipsIcon = <svg viewBox="0 0 24 24"><path d="M15 22.5H9v-2h6zm0-4H9v-3.67a7 7 0 1 1 6 0zm-4-2h2v-3.05l.67-.24a5 5 0 1 0-3.34 0l.67.23z" fill="#39364f"></path></svg>
  const arrowIcon = <svg class="arrow-right-chunky_svg__eds-icon--arrow-right-chunky_svg" viewBox="0 0 24 24"><path class="arrow-right-chunky_svg__eds-icon--arrow-right-chunky_base" fill-rule="evenodd" clip-rule="evenodd" d="M10.5 5.5L16 11H4v2h12l-5.5 5.5L12 20l8-8-8-8z"></path></svg> 
  return (
      <div className={classes.container}>
        <div className={classes.publish}>
          <h1 className={classes.header}>Publish Your Event</h1>
          <CreatorEventCard image={image} title="Rana Trial" date="Monday, June 12, 2023 at 7:00 PM EET" type="Online Event" tickets="15" followers="120" /> 
          <div className={classes.section2}>
            <Formik>
              <Form>

              </Form>
            </Formik>
            <div className={classes.tips}>
              <h3 className={classes.tipsHeader}>{tipsIcon} Tips before you publish</h3>
              <div className={classes.options}>
                <p>Create promo codes for your event {arrowIcon}</p>
                <p>Customize your order form {arrowIcon}</p>
                <p>Manage how you get paid {arrowIcon}</p>
                <p>Set your refund policy {arrowIcon}</p>
                <p>Add this event to a collection to increase visibility {arrowIcon}</p>
                <p>Develop a safety plan for your event {arrowIcon}</p>
              </div>
            </div>
          </div>
          
          <div className={classes.footer}>
            <hr></hr>
            <button className={classes.btn}>Publish</button>
          </div>         
        </div>
        
      </div>
  );
};

export default CreatorPublish;
