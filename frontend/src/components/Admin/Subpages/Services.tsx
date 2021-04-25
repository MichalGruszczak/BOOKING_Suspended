import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

// ! STYLES
const useStyles = makeStyles(() => ({
  services__wrapper: {
    paddingTop: "30px",
    backgroundColor: "salmon",
  },
}));

// ! FUNCTION
const Services: React.FC = () => {
  const classes = useStyles();
  // ! RETURN
  return (
    <Grid className={classes.services__wrapper} container item xs={12}>
      services services services services services services services services services
      services services services services services services services services services
      services services services services services services services services services
      services services services
    </Grid>
  );
};

export default Services;
