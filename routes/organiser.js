const express = require("express");
const Organiser = require("../models/Organiser");
const Member = require("../models/Member");

const router = express.Router();

router.get("/get/:organiserCode", (req, res) => {
  Organiser.find({ organiser: req.params.organiserCode })
    .exec()
    .then((data) => {
      Member.find({ party: data[0].party })
        .exec()
        .then((result) => {
          res.json({ organiser: data, members: result });
        })
        .catch((err) => res.json({ message: err }));
    })
    .catch((err) => res.json({ message: err }));
});

router.get("/party/:partyCode", (req, res) => {
  Organiser.find({ party: req.params.partyCode })
    .exec()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

router.get("/all", (req, res) => {
  Organiser.find({})
    .exec()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

router.post("/", (req, res) => {
  try {
    const organiser = new Organiser({
      organiser: "o" + Date.now().toString(16),
      party:
        "p" + (Date.now() - -Math.floor(Math.random() * 2000 + 1)).toString(16),
    });

    organiser
      .save()
      .then((data) => res.json(data))
      .catch((err) => {
        res.json({ message: err });
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
