import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import DateRangeIcon from "@material-ui/icons/DateRange";

// ! STYLE
const useStyles = makeStyles((theme) => ({
  root: {},
  title__text: {
    fontWeight: "bold",
    marginLeft: "5px",
  },
  title__textMarker: {
    fontFamily: "Permanent Marker",
    fontWeight: "normal",
  },

  title__iconLoader: {
    fontSize: "38px",
    marginRight: "5px",
  },
}));

const Title: React.FC<{ destination: string }> = (props) => {
  const classes = useStyles();

  //   ! RETURN
  return (
    <Grid container justify="center" alignItems="center">
      <DateRangeIcon color="primary" className={classes.title__iconLoader} />
      <Typography variant="h5" color="primary" className={classes.title__text}>
        Booking by <span className={classes.title__textMarker}>M.G.</span>
      </Typography>
    </Grid>
  );
};

export default Title;
