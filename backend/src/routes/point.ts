import express from "express";
import Point from "../models/Point";
import auth from "../jwtMiddleware";
import { v4 as uuid } from "uuid";

const router = express.Router();

// ! ALL POINTS
router.get("/", auth, (req, res) => {
  Point.find({}, (err, points) => {
    if (err) throw err;
    const pointsArray: { name: string; street: string }[] = [];

    points.forEach((point) => {
      const newPoint = {
        name: point.name,
        street: point.street,
      };

      pointsArray.push(newPoint);
    });
    res.json({
      pointsArray,
    });
  });
});

// ! CREATE NEW POINT
router.post("/add", auth, (req, res) => {
  const newPoint = new Point({
    id: uuid(),
    name: req.body.name,
    street: req.body.street,
  });

  try {
    newPoint.save().then((point) => {
      res.json({
        msg: `Service point "${point.name}, ${point.street}" successfully added`,
      });
    });
  } catch (err) {
    res.json({ msg: err });
  }
});

// ! EDIT POINT - NAME AND STREET
router.patch("/:pointID/edit", auth, (req, res) => {
  try {
    Point.findOne({ id: req.params.pointID }).then((point) => {
      point!.name = req.body.name;
      point!.street = req.body.street;
      point!.save().then(() => {
        res.json({
          msg: "Service point data updated",
        });
      });
    });
  } catch (err) {
    res.json({ msg: err });
  }
});

// ! DELETE POINT
router.delete("/:pointID/delete", auth, (req, res) => {
  try {
    Point.deleteOne({ id: req.params.pointID }).then(() => {
      res.json({
        msg: `Service point removed`,
      });
    });
  } catch (err) {
    res.json({
      msg: err,
    });
  }
});

module.exports = router;
