import LoadingSpinner from "./LoadingSpinner";

import classes from './Spinner.module.css';

const Spinner = (props) => {
  return <div className={classes.spinner}>
    <LoadingSpinner />
  </div>
};

export default Spinner;