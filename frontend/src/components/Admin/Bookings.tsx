import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

// ! STYLES
const useStyles = makeStyles(() => ({
  bookings__wrapper: {
    paddingTop: "30px",
    backgroundColor: "green",
  },
}));

// ! FUNCTION
const Bookings: React.FC = () => {
  const classes = useStyles();
  // ! RETURN
  return (
    <Grid className={classes.bookings__wrapper} container item xs={12}>
      bookings bookings bbookings bookings bookings bookings bbookings bookings bookings
      bookings bbookings bookings bookings bookings bbookings bookings bookings bookings
      bbookings bookings bookings bookings bbookings bookings
    </Grid>
  );
};

export default Bookings;
