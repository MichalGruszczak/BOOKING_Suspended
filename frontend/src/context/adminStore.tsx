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
    name: "John", // mock
    surname: "Doe", // mock
    position: "",
  };

  token: string | null = "123"; // mock
  isExist: boolean = true; // mock
  isAuth: boolean = true; // mock
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
  ) => {};

  // ! CHECK FOR ADMIN EXIST AND AUTH - RUN IN CONSTRUCTOR

  isAdminAuthExist = async () => {};

  // ! LOGIN ADMIN

  loginAdmin = async (login: string, password: string) => {};

  // ! LOGOUT ADMIN

  logoutAdmin = () => {};
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
