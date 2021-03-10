import express from "express";
import Service from "../models/Service";
import auth from "../jwtMiddleware";
import { v4 as uuid } from "uuid";

const router = express.Router();

type IService = {
  id: string;
  name: string;
  description?: string;
  price: number;
  time: number;
};

// ! GET ALL SERVICES
router.get("/", auth, (req, res) => {
  try {
    Service.find({}, (err, services) => {
      if (err) throw err;
      const servicesArray: IService[] = [];

      services.forEach((service) => {
        const newService = {
          id: service.id,
          name: service.name,
          description: service.description,
          price: service.price,
          time: service.time,
        };

        servicesArray.push(newService);
      });

      res.json({
        msg: servicesArray,
      });
    });
  } catch (err) {
    res.json({
      msg: err,
    });
  }
});

// ! ADD SERVICE
router.post("/add", auth, (req, res) => {
  const { name, description, price, time } = req.body;
  const newService = new Service({
    id: uuid(),
    name,
    description,
    price,
    time,
  });

  newService
    .save()
    .then(() => {
      res.json({
        msg: "New service added to database",
      });
    })
    .catch((err) => {
      res.json({
        msg: err,
      });
    });
});

// ! EDIT SERVICE
router.patch("/:serviceID/edit", auth, (req, res) => {
  const { name, description, price, time } = req.body;
  Service.findOne({ id: req.params.serviceID })
    .then((item) => {
      (item!.name = name),
        (item!.description = description),
        (item!.price = price),
        (item!.time = time);
      item!
        .save()
        .then(() => {
          res.json({
            msg: `Service edited`,
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

// ! DELETE SERVICE
router.delete("/:serviceID/delete", auth, (req, res) => {
  Service.findOneAndDelete({ id: req.params.serviceID })
    .then(() => {
      res.json({
        msg: "Service removed from database",
      });
    })
    .catch((err) => {
      res.json({
        msg: err,
      });
    });
});

module.exports = router;
