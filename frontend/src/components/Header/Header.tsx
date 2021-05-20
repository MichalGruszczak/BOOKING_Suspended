import React from "react";
import "./header.scss";
import { Grid } from "@material-ui/core";
import Navbar from "../Navbar/Navbar";

// ! MAIN FUNCTION

const Header = () => {
  return (
    <Grid className="header" container item xs={12}>
      <Navbar />
    </Grid>
  );
};

export default Header;
