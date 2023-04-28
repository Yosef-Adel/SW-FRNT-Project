import classes from "./dashboaradcards.module.css";

/**
 * Component that returns Cards of Creator's Dashboard page
 *
 * @component
 * @example
 * return(<DashboardCards title="title" amount="amount" total="total"/>)
 */
const DashboardCards = ({ title, amount, total }) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>{title}</div>
      <div className={classes.amountandtotal}>
        <div className={classes.amount}>{amount}</div>
        {total && <div className={classes.total}>/{total}</div>}
      </div>
    </div>
  );
};

export default DashboardCards;
