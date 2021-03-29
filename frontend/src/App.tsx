import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
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
        <Router>
          <NavLink to="/"></NavLink>
          <NavLink to="/admin"></NavLink>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route path="/" exact component={ClientSection}></Route>
              <Route path="/admin" component={AdminSection}></Route>
            </Switch>
          </Suspense>
        </Router>
      </div>
    </AdminStoreProvider>
  );
};

export default App;
