import React, { Suspense } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import { AdminStore, AdminStoreProvider } from "./context/adminStore";
import Loader from "./components/Loader/Loader";

const ClientMainWrapper = React.lazy(
  () => import("./containers/ClientMainWrapper/ClientMainWrapper")
);
const AdminMainWrapper = React.lazy(
  () => import("./containers/AdminMainWrapper/AdminMainWrapper")
);

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
            <Route path="/" exact component={ClientMainWrapper}></Route>
            <Route path="/admin" component={AdminMainWrapper}></Route>
          </Suspense>
        </Switch>
      </div>
    </AdminStoreProvider>
  );
};

export default App;
