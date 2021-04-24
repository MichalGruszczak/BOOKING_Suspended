import React, { Suspense } from "react";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import { AdminStore, AdminStoreProvider } from "./store/adminStore";
import Loader from "./components/Common/Loader";

const ClientSection = React.lazy(() => import("./components/Client/ClientSection"));
const AdminSection = React.lazy(() => import("./components/Admin/AdminSection"));

// ! STORE - INSTANCJE OF STORE CLASS
const adminStore = new AdminStore();

const App: React.FC = () => {
  return (
    <AdminStoreProvider store={adminStore}>
      <div className="App">
        <NavLink to="/"></NavLink>
        <NavLink to="/admin"></NavLink>
        <Switch>
          <Suspense fallback={<Loader />}>
            <Route path="/" exact component={ClientSection}></Route>
            <Route path="/admin" component={AdminSection}></Route>
          </Suspense>
        </Switch>
      </div>
    </AdminStoreProvider>
  );
};

export default App;
