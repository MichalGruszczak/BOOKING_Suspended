import React from "react";
import { observer } from "mobx-react";
import { useAdminStore } from "../../store/adminStore";
import Login from "./Login";

const AdminSection: React.FC = observer(() => {
  const adminStore = useAdminStore();

  const renderByAdminExist = () => {
    // * AUTH TRUE - CMS RENDER
    if (adminStore.isAuth)
      return (
        <>
          <h3>Main Admin Page</h3>
          <button onClick={adminStore.logoutAdmin}>LOGOUT</button>
        </>
      );
    // * ADMIN EXIST IN DB - LOGIN RENDER
    if (adminStore.isExist) return <Login />;
    // * ADMIN DOESN'T EXIST IN DB - REGISTER RENDER
    else
      return (
        <>
          <h3>Register Page</h3>
          <button>REGISTER</button>
        </>
      );
  };

  return <section className="admin-wrapper">{renderByAdminExist()}</section>;
});

export default AdminSection;
