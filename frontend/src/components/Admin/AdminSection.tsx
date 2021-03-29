import React, { Suspense } from "react";
import { observer } from "mobx-react";
import { useAdminStore } from "../../store/adminStore";
import Loader from "../Common/Loader";

const Login = React.lazy(() => import("./Login"));
const Register = React.lazy(() => import("./Register"));

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
    if (adminStore.isExist)
      return (
        <Suspense fallback={<Loader />}>
          <Login />
        </Suspense>
      );
    // * ADMIN DOESN'T EXIST IN DB - REGISTER RENDER
    else
      return (
        <Suspense fallback={<Loader />}>
          <Register />
        </Suspense>
      );
  };

  return <section className="admin-wrapper">{renderByAdminExist()}</section>;
});

export default AdminSection;
