import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

// * ADMIN INTERFACE
interface IAdmin {
  name: string;
  surname: string | undefined;
  position: string | undefined;
}

// * POSSIBLE RESPONSES FOR isAdminExist
export enum CheckAdminResponse {
  AdminExist = "Admin exist",
  AdminNotExist = "Admin not exist",
}

// * POSSIBLE RESPONSES FOR loginAdmin
export enum LoginResponse {
  InvalidLogin = "Such Admin does not exist",
  InvalidPassword = "Invalid password",
  AuthDone = "Auth done",
}

// ! MOBX STORE CLASS
class AdminStore {
  admin: IAdmin = {
    name: "",
    surname: "",
    position: "",
  };

  token: string | null = "";
  isExist: boolean = false;
  isAuth: boolean = false;
  msg: string | undefined = "";
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.isAdminAuthExist();
  }

  // ! REGISTER ADMIN
  registerAdmin = async (
    name: string,
    surname: string | "",
    position: string | "",
    login: string,
    password: string
  ) => {
    const newAdminData = {
      name,
      surname,
      position,
      login,
      password,
    };
    this.loading = true;

    const response = await fetch("http://localhost:5000/api/admin/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAdminData),
    });

    const data = await response.json();
    this.loading = false;
    if (data.msg === "Admin added") {
      this.isExist = true;
    }
  };

  // ! CHECK FOR ADMIN EXIST AND AUTH - RUN IN CONSTRUCTOR
  isAdminAuthExist = async () => {
    const response = await fetch("http://localhost:5000/api/admin/");
    const data = await response.json();
    if (data.msg === CheckAdminResponse.AdminExist) {
      this.isExist = true;

      if (localStorage.getItem("isAuth") === "true" && localStorage.getItem("token")) {
        this.isAuth = true;
        this.token = localStorage.getItem("token");
      }
    }
  };

  // ! LOGIN ADMIN
  loginAdmin = async (login: string, password: string) => {
    const userCredentials = {
      login: login,
      password: password,
    };
    this.loading = true;

    const response = await fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    });
    const data = await response.json();

    if (data.msg === LoginResponse.AuthDone) {
      this.admin.name = data.admin.name;
      this.admin.surname = data.admin.surname;
      this.admin.position = data.admin.position;
      this.isAuth = true;
      this.token = data.token;
      this.loading = false;
      this.msg = `Hello ${this.admin.name}`;
      setTimeout(() => (this.msg = ""), 5000);

      localStorage.setItem("isAuth", "true");
      localStorage.setItem(`token`, `${data.token}`);
      //
    } else if (data.msg === LoginResponse.InvalidLogin) {
      this.loading = false;
      this.msg = data.msg;
      setTimeout(() => (this.msg = ""), 5000);
    } else if (data.msg === LoginResponse.InvalidPassword) {
      this.loading = false;
      this.msg = data.msg;
      setTimeout(() => (this.msg = ""), 5000);
    }
  };

  // ! LOGOUT ADMIN
  logoutAdmin = () => {
    this.admin.name = "";
    this.admin.surname = "";
    this.admin.position = "";
    this.token = null;
    this.isAuth = false;
    localStorage.setItem("isAuth", "false");
    localStorage.setItem("token", "");
  };
}

// * .................................................... //
// * PROVIDERS ETC.

// ! STORE CONTEXT - WITH INSTANCE OF STORE CLASS
const AdminStoreContext = createContext<AdminStore>(new AdminStore());

// ! PROVIDER - VALUE IS STORE CLASS - NOT INSTANCE
const AdminStoreProvider: React.FC<{ store: AdminStore }> = ({ store, children }) => {
  return (
    <AdminStoreContext.Provider value={store}>{children}</AdminStoreContext.Provider>
  );
};

// ! CUSTOM HOOK TO SIMPLE STORE USE
const useAdminStore = () => {
  return useContext(AdminStoreContext);
};

export { AdminStore, AdminStoreProvider, useAdminStore };
