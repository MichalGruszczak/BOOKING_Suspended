import React from "react";
import "./services.scss";
import { Grid } from "@material-ui/core";

// ! FUNCTION
const Services: React.FC = () => {
  // ! RETURN
  return (
    <Grid className="cms-services" container item xs={12}>
      services services services services services services services services services
      services services services services services services services services services
      services services services services services services services services services
      services services services
    </Grid>
  );
};

export default Services;
