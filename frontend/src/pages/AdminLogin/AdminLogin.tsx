import React, { useState, useEffect } from "react";
import "./adminLogin.scss";
import { useAdminStore } from "../../context/adminStore";
import { observer } from "mobx-react";
import { Grid, TextField, Button, Paper, CircularProgress } from "@material-ui/core";
import Title from "../../components/Title/Title";

const Login: React.FC = observer(() => {
  const adminStore = useAdminStore();

  // ! STATE

  // * CREDENTIALS INPUTS

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  // * INPUT ERRORS TO USE EFFECT

  const [loginErrorDraft, setLoginErrorDraft] = useState("This field cannot be empty!");
  const [passwordErrorDraft, setPasswordErrorDraft] = useState(
    "This field cannot be empty!"
  );

  // * INPUT ERRORS TO INPUTS

  const [loginInputError, setLoginInputError] = useState("");
  const [passwordInputError, setPasswordInputError] = useState("");

  // ! FUNCTIONS

  // * VALIDATION FROM FORM

  useEffect(() => {
    if (!login) setLoginErrorDraft("This field cannot be empty!");
    if (login) setLoginErrorDraft("");
    if (!password) setPasswordErrorDraft("This field cannot be empty!");
    if (password) setPasswordErrorDraft("");
  }, [login, password]);

  // * VALIDATION FROM DB - LOGIN, PASSWORD

  useEffect(() => {
    if (adminStore.msg === "Such Admin does not exist")
      setLoginInputError(adminStore.msg);
    if (adminStore.msg === "Invalid password") setPasswordInputError(adminStore.msg);
  }, [adminStore.msg]);

  // * MAIN FUNCTION - SUBMIT LOGIN FORM

  const handleSubmit = () => {
    if (loginErrorDraft || passwordErrorDraft) {
      setLoginInputError(loginErrorDraft);
      setPasswordInputError(passwordErrorDraft);
    } else {
      adminStore.loginAdmin(login, password);
    }
  };

  // ! RETURN
  return (
    <Grid container justify="center" alignContent="center" className="adminLogin">
      <Grid
        container
        justify="center"
        alignItems="center"
        item
        xs={10}
        className="adminLogin__titleBar"
      >
        <Title destination="modal" />
      </Grid>

      <Grid item xs={10} className="adminLogin__grid">
        <Paper elevation={3} className="adminLogin__paper">
          <TextField
            id="login"
            data-testid="login"
            label="Login"
            variant="outlined"
            required
            error={loginInputError ? true : false}
            helperText={loginInputError}
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            onFocus={() => setLoginInputError("")}
          ></TextField>
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            required
            error={passwordInputError ? true : false}
            helperText={passwordInputError}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordInputError("")}
          ></TextField>

          {adminStore.loading ? (
            <CircularProgress color="primary" />
          ) : (
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Sign In
            </Button>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
});

export default Login;
