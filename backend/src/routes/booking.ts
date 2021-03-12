import express from "express";
import Booking from "../models/Booking";
import auth from "../jwtMiddleware";
import { v4 as uuid } from "uuid";

const router = express.Router();

interface IBooking {
  id: string;
  client: {
    name: string;
    surname: string;
    phone: string;
  };
  pointID: string;
  serviceID: string;
  employeeID: string | undefined;
  date: string;
  hour: string;
  time: number;
}

// ! GET ALL BOOKINGS
router.get("/", auth, (req, res) => {
  try {
    Booking.find({}, (err, bookings) => {
      if (err) throw err;
      const bookingsArray: IBooking[] = [];

      bookings.forEach((booking) => {
        const newBooking: IBooking = {
          id: booking.id,
          client: booking.client,
          pointID: booking.pointID,
          serviceID: booking.serviceID,
          employeeID: booking.employeeID,
          date: booking.date,
          hour: booking.hour,
          time: booking.time,
        };

        bookingsArray.push(newBooking);
      });
      res.json({
        msg: bookingsArray,
      });
    });
  } catch (err) {
    res.json({
      msg: err,
    });
  }
});

// ! ADD BOOKING
router.post("/add", (req, res) => {
  const { client, pointID, serviceID, employeeID, date, hour, time } = req.body;

  const newBooking = new Booking({
    id: uuid(),
    client: {
      name: client.name,
      surname: client.surname,
      phone: client.phone,
    },
    pointID,
    serviceID,
    employeeID,
    date,
    hour,
    time,
  });

  newBooking
    .save()
    .then(() => {
      res.json({
        msg: "Booking added to database",
      });
    })
    .catch((err) => {
      res.json({
        msg: err,
      });
    });
});

// ! EDIT BOOKING
router.patch("/:bookingID/edit", (req, res) => {
  Booking.findOne({ id: req.params.bookingID })
    .then((booking) => {
      const {
        client,
        pointID,
        serviceID,
        employeeID,
        date,
        hour,
        time,
      } = req.body;

      (booking!.client.name = client.name),
        (booking!.client.surname = client.surname),
        (booking!.client.phone = client.phone),
        (booking!.pointID = pointID),
        (booking!.serviceID = serviceID),
        (booking!.employeeID = employeeID),
        (booking!.date = date),
        (booking!.hour = hour),
        (booking!.time = time),
        booking!
          .save()
          .then(() => {
            res.json({
              msg: "Booking data updated",
            });
          })
          .catch((err) => {
            res.json({
              msg: err,
            });
          });
    })
    .catch((err) => {
      res.json(err);
    });
});

// ! DELETE BOOKING
router.delete("/:bookingID/delete", (req, res) => {
  Booking.findOneAndDelete({ id: req.params.bookingID })
    .then(() => {
      res.json({
        msg: "Booking deleted from database",
      });
    })
    .catch((err) => {
      res.json({
        msg: err,
      });
    });
});

module.exports = router;
