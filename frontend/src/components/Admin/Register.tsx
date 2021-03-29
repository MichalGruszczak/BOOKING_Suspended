import React, { useState, useEffect } from "react";
import { useAdminStore } from "../../store/adminStore";
import { observer } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Button, Paper, CircularProgress } from "@material-ui/core";

// ! STYLES
const useStyles = makeStyles((theme) => ({
  root: {},
  register__wrapper: {
    width: "100%",
    height: "100vh",
    backgroundColor: "lightblue",
  },
  register__titleBar: {
    backgroundColor: "red",
    height: "70px",
  },
  register__grid: {
    height: "580px",
    backgroundColor: "white",
  },
  register__paper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
}));

const Register: React.FC = observer(() => {
  const adminStore = useAdminStore();
  const classes = useStyles();

  //   ! STATE
  // #region
  //   * NEW ADMIN INPUTS
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [position, setPosition] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // * INPUT ERRORS TO USE EFFECT
  const [nameDraftError, setNameDraftError] = useState("This field cannot be empty!");
  const [surnameDraftError, setSurnameDraftError] = useState("");
  const [positionDraftError, setPositionDraftError] = useState("");
  const [loginDraftError, setLoginDraftError] = useState("This field cannot be empty!");
  const [passwordDraftError, setPasswordDraftError] = useState(
    "This field cannot be empty!"
  );
  const [confirmDraftError, setConfirmDraftError] = useState(
    "This field cannot be empty!"
  );

  //   * INPUT ERRORS TO INPUTS
  const [nameInputError, setNameInputError] = useState("");
  const [surnameInputError, setSurnameInputError] = useState("");
  const [positionInputError, setPositionInputError] = useState("");
  const [loginInputError, setLoginInputError] = useState("");
  const [passwordInputError, setPasswordInputError] = useState("");
  const [confirmInputError, setConfirmInputError] = useState("");
  //#endregion

  // ! FUNCTIONS
  //#region

  // * VALIDATION
  useEffect(() => {
    //
    if (!name) setNameDraftError("This field cannot be empty!");
    if (name && name.length < 2) setNameDraftError("At least 2 characters required");
    if (name && name.length > 1) setNameDraftError("");
    //
    if (surname && surname.length < 2) {
      setSurnameDraftError("At least 2 characters required!");
    }
    if ((surname && surname.length > 1) || !surname) setSurnameDraftError("");
    //
    if (position && position.length < 2)
      setPositionDraftError("At least 2 characters required!");
    if ((position && position.length > 1) || !position) setPositionDraftError("");
    //
    if (!login) setLoginDraftError("This field cannot be empty!");
    if (login && login.length < 2) setLoginDraftError("At least 2 characters required");
    if (login && login.length > 1) setLoginDraftError("");
    //
    if (!password) setPasswordDraftError("This field cannot be empty!");
    if (password) setPasswordDraftError("");
    //
    if (!confirm) setConfirmDraftError("This field cannot be empty!");
    if (confirm && confirm !== password)
      setConfirmDraftError("The passwords provided do not match!");
    if (confirm && confirm === password) setConfirmDraftError("");
  }, [name, surname, position, login, password, confirm]);

  // * SUBMIT
  const handleSubmit = () => {
    if (
      nameDraftError ||
      surnameDraftError ||
      positionDraftError ||
      loginDraftError ||
      passwordDraftError ||
      confirmDraftError
    ) {
      setNameInputError(nameDraftError);
      setSurnameInputError(surnameDraftError);
      setPositionInputError(positionDraftError);
      setLoginInputError(loginDraftError);
      setPasswordInputError(passwordDraftError);
      setConfirmInputError(confirmDraftError);
    } else {
      adminStore.registerAdmin(name, surname, position, login, password);
    }
  };

  //#endregion

  //   ! RETURN
  return (
    <Grid
      container
      justify="center"
      alignContent="center"
      className={classes.register__wrapper}
    >
      <Grid
        container
        justify="center"
        alignItems="center"
        item
        xs={10}
        className={classes.register__titleBar}
      >
        Booking by M.G.
      </Grid>
      <Grid item xs={10} className={classes.register__grid}>
        <Paper elevation={3} className={classes.register__paper}>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            required
            error={nameInputError ? true : false}
            helperText={nameInputError}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setNameInputError("")}
          ></TextField>
          <TextField
            id="surname"
            label="Surname"
            variant="outlined"
            error={surnameInputError ? true : false}
            helperText={surnameInputError}
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            onFocus={() => setSurnameInputError("")}
          ></TextField>
          <TextField
            id="position"
            label="Position"
            variant="outlined"
            error={positionInputError ? true : false}
            helperText={positionInputError}
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            onFocus={() => setPositionInputError("")}
          ></TextField>
          <TextField
            id="login"
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
            required
            type="password"
            error={passwordInputError ? true : false}
            helperText={passwordInputError}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordInputError("")}
          ></TextField>
          <TextField
            id="confirm"
            label="Confirm Password"
            variant="outlined"
            required
            type="password"
            error={confirmInputError ? true : false}
            helperText={confirmInputError}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            onFocus={() => setConfirmInputError("")}
          ></TextField>
          {adminStore.loading ? (
            <CircularProgress color="primary" />
          ) : (
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Register
            </Button>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
});

export default Register;
