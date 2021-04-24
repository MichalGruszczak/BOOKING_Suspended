import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

// ! STYLES
const useStyles = makeStyles(() => ({
  adminData__wrapper: {
    paddingTop: "30px",
    backgroundColor: "purple",
  },
}));

// ! FUNCTION
const AdminData: React.FC = () => {
  const classes = useStyles();
  // ! RETURN
  return (
    <Grid className={classes.adminData__wrapper} container item xs={12}>
      adminData adminData adminData adminData adminData adminData adminData adminData
      adminData adminData adminData adminData adminData adminData adminData adminData
      adminData adminData adminData adminData adminData adminData adminData adminData
    </Grid>
  );
};

export default AdminData;
