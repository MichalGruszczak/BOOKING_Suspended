import React, { Suspense } from "react";
import "./commandCenter.scss";
import Header from "../../components/Header/Header";
import { Route, Switch } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { Grid } from "@material-ui/core";

// ! LAZY IMPORT CMS SUBPAGES
const ServicePoints = React.lazy(
  () => import("../../pages/CMSPages/ServicePoints/ServicePoints")
);
const Bookings = React.lazy(() => import("../../pages/CMSPages/Bookings/Bookings"));
const Employees = React.lazy(() => import("../../pages/CMSPages/Employees/Employees"));
const Services = React.lazy(() => import("../../pages/CMSPages/Services/Services"));
const Settings = React.lazy(() => import("../../pages/CMSPages/Settings/Settings"));
const AdminData = React.lazy(() => import("../../pages/CMSPages/AdminData/AdminData"));

// ! ROUTES ARRAY - CMS SUBPAGES
const routes = [
  { route: "/admin/points", component: ServicePoints, exact: false },
  { route: "/admin", component: Bookings, exact: true },
  { route: "/admin/employees", component: Employees, exact: false },
  { route: "/admin/services", component: Services, exact: false },
  { route: "/admin/settings", component: Settings, exact: false },
  { route: "/admin/admin_data", component: AdminData, exact: false },
];

// ! FUNCTION
const CommandCenter: React.FC = () => {
  // ! RETURN
  return (
    <Grid className="commandCenter" container item xs={12}>
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
