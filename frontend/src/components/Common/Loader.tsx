import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CircularProgress } from "@material-ui/core";
import Title from "./Title";

// ! STYLES
const useStyles = makeStyles((theme) => ({
  root: {},
  loader: {
    width: "100%",
    height: "100vh",
    backgroundColor: "lightblue",
  },

  loader__title: {
    marginBottom: "15px",
  },

  loader__spinner: {
    marginTop: "15px",
  },
}));

const Loader: React.FC = () => {
  const classes = useStyles();

  //   ! RETURN
  return (
    <Grid container justify="center" alignContent="center" className={classes.loader}>
      <Grid
        item
        xs={12}
        container
        justify="center"
        alignContent="center"
        className={classes.loader__title}
      >
        <Title destination="loader" />
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
        <CircularProgress color="primary" size={50} thickness={4} />
      </Grid>
    </Grid>
  );
};

export default Loader;
