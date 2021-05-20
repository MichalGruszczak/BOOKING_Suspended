import React, { Suspense } from "react";
import { observer } from "mobx-react";
import { useAdminStore } from "../../context/adminStore";
import Loader from "../../components/Loader/Loader";

const AdminLoginPage = React.lazy(() => import("../../pages/AdminLogin/AdminLogin"));
const AdminRegisterPage = React.lazy(
  () => import("../../pages/AdminRegister/AdminRegister")
);
const AdminCMS = React.lazy(() => import("../../containers/AdminCMS/AdminCMS"));

const AdminSection: React.FC = observer(() => {
  const adminStore = useAdminStore();

  const renderByAdminExist = () => {
    // * AUTH TRUE - CMS RENDER
    if (adminStore.isAuth)
      return (
        <Suspense fallback={<Loader />}>
          <AdminCMS />
        </Suspense>
      );
    // * ADMIN EXIST IN DB - LOGIN RENDER
    if (adminStore.isExist)
      return (
        <Suspense fallback={<Loader />}>
          <AdminLoginPage />
        </Suspense>
      );
    // * ADMIN DOESN'T EXIST IN DB - REGISTER RENDER
    else
      return (
        <Suspense fallback={<Loader />}>
          <AdminRegisterPage />
        </Suspense>
      );
  };

  return <section className="admin-wrapper">{renderByAdminExist()}</section>;
});

export default AdminSection;
