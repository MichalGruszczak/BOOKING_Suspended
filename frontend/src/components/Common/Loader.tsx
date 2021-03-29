import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CircularProgress } from "@material-ui/core";

// ! STYLES
const useStyles = makeStyles((theme) => ({
  root: {},
  loader: {
    width: "100%",
    height: "100vh",
    backgroundColor: "lightblue",
  },

  loader__title: {
    marginBottom: "10px",
  },

  loader__spinner: {
    marginTop: "10px",
  },
}));

const Loader = () => {
  const classes = useStyles();

  //   ! RETURN
  return (
    <Grid container justify="center" alignContent="center" className={classes.loader}>
      <Grid
        item
        xs={10}
        container
        justify="center"
        alignContent="center"
        className={classes.loader__title}
      >
        Booking by M.G.
      </Grid>
      <Grid
        item
        xs={10}
        container
        justify="center"
        alignContent="center"
        className={classes.loader__spinner}
      >
        {" "}
        <CircularProgress color="primary" />
      </Grid>
    </Grid>
  );
};

export default Loader;
