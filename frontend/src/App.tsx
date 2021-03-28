import React from "react";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import ClientSection from "./components/Client/ClientSection";
import AdminSection from "./components/Admin/AdminSection";
import { AdminStore, AdminStoreProvider } from "./store/adminStore";

// ! STORE - INSTANCJE OF STORE CLASS
const adminStore = new AdminStore();

const App: React.FC = () => {
  return (
    <AdminStoreProvider store={adminStore}>
      <div className="App">
        <Router>
          <NavLink to="/"></NavLink>
          <NavLink to="/admin"></NavLink>
          <Switch>
            <Route path="/" exact component={ClientSection}></Route>
            <Route path="/admin" component={AdminSection}></Route>
          </Switch>
        </Router>
      </div>
    </AdminStoreProvider>
  );
};

export default App;
