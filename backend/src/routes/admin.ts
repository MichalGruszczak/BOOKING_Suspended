import express from "express";
import Admin from "../models/Admin";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import auth from "../jwtMiddleware";

const router = express.Router();
const db = mongoose.connection;

// * POSSIBLE RESPONSES FOR CHECK FOR ADMIN ROUT
export enum CheckAdminResponse {
  AdminExist = "Admin exist",
  AdminNotExist = "Admin not exist",
}

// * POSSIBLE RESPONSES FOR REGISTER ROUT
export enum RegisterResponse {
  AdminAdded = "Admin added",
  AdminExist = "Admin already exist",
}

// * POSSIBLE RESPONSES FOR LOGIN ROUT
export enum LoginResponse {
  InvalidLogin = "Such Admin does not exist",
  InvalidPassword = "Invalid password",
  AuthDone = "Auth done",
}

// ! CHECK FOR ADMIN - IT DEPENDS ON RENDERED VIEW - LOGIN OR REGISTER
router.get("/", (req, res) => {
  try {
    db.collections.admins.countDocuments({}, (err, count: number) => {
      if (err) res.json({ msg: err });
      if (count === 0) res.json({ msg: CheckAdminResponse.AdminNotExist });
      if (count === 1) res.json({ msg: CheckAdminResponse.AdminExist });
    });
  } catch (err) {
    res.json({ msg: err });
  }
});

// ! FIRST REGISTRATION
router.post("/register", async (req, res) => {
  const { name, surname, position, login, password } = req.body;

  const newAdmin = new Admin({
    name,
    surname,
    position,
    login,
    password,
  });

  try {
    db.collections.admins.countDocuments({}, (err, count: number) => {
      if (err) res.json({ msg: err });
      if (count === 0) {
        // !
        // * BCRYPT
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if (err) throw err;
            newAdmin.password = hash;
            newAdmin.save().then((user) => {
              // * JWT
              jwt.sign(
                { login: user.login },
                process.env.JWTSecret!,
                { expiresIn: 999999999 },
                (err, token) => {
                  if (err) throw err;
                  res.json({
                    msg: RegisterResponse.AdminAdded,
                    token,
                  });
                }
              );
            });
          });
        });
        // !
      } else {
        res.json({
          msg: RegisterResponse.AdminExist,
        });
      }
    });
  } catch (err) {
    res.json({ msg: err });
  }
});

// ! LOGIN
router.post("/login", (req, res) => {
  const { login, password } = req.body;

  try {
    Admin.findOne({ login }).then((admin) => {
      if (!admin) return res.json({ msg: LoginResponse.InvalidLogin });
      // !
      // * BCRYPT - PASSWORD COMPARE
      bcrypt.compare(password, admin.password).then((isMatch) => {
        if (!isMatch) return res.json({ msg: LoginResponse.InvalidPassword });

        // * JWT
        jwt.sign(
          { login: admin.login },
          process.env.JWTSecret!,
          { expiresIn: 999999999 },
          (err, token) => {
            if (err) throw err;
            res.json({
              msg: LoginResponse.AuthDone,
              admin,
              token,
            });
          }
        );
      });
      // !
    });
  } catch (err) {
    res.json({ msg: err });
  }
});

// ! EDIT ADMIN - PERSONAL DATA
router.patch("/:adminName/personal", auth, (req, res) => {
  try {
    Admin.updateOne(
      { name: req.params.adminName },
      {
        $set: {
          name: req.body.name,
          surname: req.body.surname,
          position: req.body.position,
        },
      }
    ).then(() => {
      res.json({ msg: "Admin personal data updated" });
    });
  } catch (err) {
    res.json({ msg: err });
  }
});

// ! EDIT ADMIN - LOGIN DATA
router.patch("/:adminName/login-data", auth, (req, res) => {
  try {
    Admin.findOne({ name: req.params.adminName }).then((user) => {
      let newLogin = req.body.login;
      let newPassword = req.body.password;

      // * BCRYPT
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newPassword, salt, (err, hash) => {
          if (err) throw err;
          newPassword = hash;
          user!.login = newLogin;
          user!.password = newPassword;
          user!.save().then((user) => {
            // * JWT
            jwt.sign(
              { login: user.login },
              process.env.JWTSecret!,
              { expiresIn: 999999999 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  msg: "User login data updated",
                  token,
                });
              }
            );
          });
        });
      });
    });
  } catch (err) {
    res.json({ msg: err });
  }
});

// ! DELETE ADMIN
router.delete("/:adminName", auth, (req, res) => {
  try {
    Admin.deleteOne({ name: req.params.adminName }).then(() => {
      res.json({
        msg: "Admin deleted",
      });
    });
  } catch (err) {
    res.json({ msg: err });
  }
});

module.exports = router;
