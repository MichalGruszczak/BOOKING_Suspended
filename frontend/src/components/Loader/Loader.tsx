import React from "react";
import "./loader.scss";
import { Grid, CircularProgress } from "@material-ui/core";
import Title from "../Title/Title";

const Loader: React.FC = () => {
  //   ! RETURN

  return (
    <Grid container justify="center" alignContent="center" className="loader">
      <Grid
        item
        xs={12}
        container
        justify="center"
        alignContent="center"
        className="loader__title"
      >
        <Title destination="loader" />
      </Grid>
      <Grid
        item
        xs={10}
        container
        justify="center"
        alignContent="center"
        className="loader__spinner"
      >
        {" "}
        <CircularProgress color="primary" size={50} thickness={4} />
      </Grid>
    </Grid>
  );
};

export default Loader;
