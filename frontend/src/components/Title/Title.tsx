import React from "react";
import "./title.scss";
import { Grid, Typography } from "@material-ui/core";
import DateRangeIcon from "@material-ui/icons/DateRange";

const Title: React.FC<{ destination: string }> = (props) => {
  //   ! RETURN
  return (
    <Grid className="title" container justify="center" alignItems="center">
      <DateRangeIcon color="primary" className="title__iconLoader" />
      <Typography variant="h5" color="primary" className="title__text">
        Booking by <span className="title__textMarker">M.G.</span>
      </Typography>
    </Grid>
  );
};

export default Title;
