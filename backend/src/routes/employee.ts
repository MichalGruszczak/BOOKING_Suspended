import express from "express";
import Employee from "../models/Employee";
import auth from "../jwtMiddleware";
import { v4 as uuid } from "uuid";

const router = express.Router();

type IEmployee = {
  id: string;
  name: string;
  surname: string;
  point: string;
  permissions: string[];
  status: string;
};

// ! GET ALL EMPLOYEES
router.get("/", auth, (req, res) => {
  try {
    Employee.find({}, (err, employees) => {
      if (err) throw err;

      const employeesArray: IEmployee[] = [];

      employees.forEach((employee) => {
        const newEmployee: IEmployee = {
          id: uuid(),
          name: employee.name,
          surname: employee.surname,
          point: employee.point,
          permissions: employee.permissions,
          status: employee.status,
        };

        employeesArray.push(newEmployee);
      });

      res.json({
        msg: employeesArray,
      });
    });
  } catch (err) {
    res.json({
      msg: err,
    });
  }
});

// ! ADD EMPLOYEE
router.post("/add", auth, (req, res) => {
  const { name, surname, point, permissions, status } = req.body;

  const newEmployee = new Employee({
    id: uuid(),
    name,
    surname,
    point,
    permissions,
    status,
  });

  newEmployee
    .save()
    .then(() => {
      res.json({
        msg: "Employee added to database",
      });
    })
    .catch((err) => {
      res.json({
        msg: err,
      });
    });
});

// ! EDIT EMPLOYEE
router.patch("/:employeeID/edit", auth, (req, res) => {
  const { name, surname, point, permissions, status } = req.body;

  Employee.findOne({ id: req.params.employeeID })
    .then((employee) => {
      employee!.name = name;
      employee!.surname = surname;
      employee!.point = point;
      employee!.permissions = permissions;
      employee!.status = status;

      employee!
        .save()
        .then(() => {
          res.json({
            msg: "Employee data updated",
          });
        })
        .catch((err) => {
          res.json({
            msg: err,
          });
        });
    })
    .catch((err) => {
      res.json({
        msg: err,
      });
    });
});

// ! DELETE EMPLOYEE
router.delete("/:employeeID/delete", auth, (req, res) => {
  Employee.findOneAndDelete({})
    .then(() => {
      res.json({
        msg: "Employee removed from database",
      });
    })
    .catch((err) => {
      res.json({
        msg: err,
      });
    });
});

module.exports = router;
