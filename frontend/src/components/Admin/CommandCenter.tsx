import React from "react";
import Header from "./Header";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  sectionWrapper: {
    height: "300vh",
  },
}));

const CommandCenter: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.sectionWrapper}>
      <Header />
    </div>
  );
};

export default CommandCenter;
