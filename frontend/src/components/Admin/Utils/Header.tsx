import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Navbar from "./Navbar";

// ! STYLES
const useStyles = makeStyles((theme) => ({
  header__container: {
    height: "30px",
    backgroundColor: "lightgray",
    position: "fixed",
  },
}));

// ! MAIN FUNCTION
const Header = () => {
  const classes = useStyles();

  //   ! RETURN
  return (
    <Grid className={classes.header__container} container item xs={12}>
      <Navbar />
    </Grid>
  );
};

export default Header;
