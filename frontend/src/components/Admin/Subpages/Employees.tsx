import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

// ! STYLES
const useStyles = makeStyles(() => ({
  employees__wrapper: {
    paddingTop: "30px",
    backgroundColor: "blue",
  },
}));

// ! FUNCTION
const Employees: React.FC = () => {
  const classes = useStyles();
  // ! RETURN
  return (
    <Grid className={classes.employees__wrapper} container item xs={12}>
      employees employees employees employees employees employees employees employees
      employees employees employees employees employees employees employees employees
      employees employees employees employees employees employees employees employees
      employees employees employees employees employees employees employees employees
      employees employees employees
    </Grid>
  );
};

export default Employees;
