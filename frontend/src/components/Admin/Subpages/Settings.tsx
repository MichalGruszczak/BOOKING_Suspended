import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

// ! STYLES
const useStyles = makeStyles(() => ({
  settings__wrapper: {
    paddingTop: "30px",
    backgroundColor: "yellowgreen",
  },
}));

// ! FUNCTION
const Settings: React.FC = () => {
  const classes = useStyles();
  // ! RETURN
  return (
    <Grid className={classes.settings__wrapper} container item xs={12}>
      settings settings settings settings settings settings settings settings settings
      settings settings settings settings settings settings settings settings settings
      settings settings settings settings settings settings settings
    </Grid>
  );
};

export default Settings;
