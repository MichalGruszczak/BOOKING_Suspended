import React, { Suspense } from "react";
import Header from "./Header";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";
import Loader from "../Common/Loader";
import { Grid } from "@material-ui/core";

// ! LAZY COMPONENTS
const Points = React.lazy(() => import("./Points"));
const Bookings = React.lazy(() => import("./Bookings"));
const Employees = React.lazy(() => import("./Employees"));
const Services = React.lazy(() => import("./Services"));
const Settings = React.lazy(() => import("./Settings"));
const AdminData = React.lazy(() => import("./AdminData"));

// ! STYLES
const useStyles = makeStyles(() => ({
  commandCenter__wrapper: {
    minHeight: "100vh",
  },
}));

// ! ROUTES
const routes = [
  { route: "/admin/points", component: Points, exact: false },
  { route: "/admin", component: Bookings, exact: true },
  { route: "/admin/employees", component: Employees, exact: false },
  { route: "/admin/services", component: Services, exact: false },
  { route: "/admin/settings", component: Settings, exact: false },
  { route: "/admin/admin_data", component: AdminData, exact: false },
];

// ! FUNCTION
const CommandCenter: React.FC = () => {
  const classes = useStyles();

  // ! RETURN
  return (
    <Grid className={classes.commandCenter__wrapper} container item xs={12}>
      <Header />
      <Switch>
        <Suspense fallback={<Loader />}>
          {routes.map((item) => {
            return (
              <Route path={item.route} component={item.component} exact={item.exact} />
            );
          })}
        </Suspense>
      </Switch>
    </Grid>
  );
};

export default CommandCenter;
