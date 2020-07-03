const db = require("../config/db.js");
const config = require("../config/config.js");
const Activity = db.activity;
const User = db.user;
const asyncMiddleware = require("express-async-handler");
const { validationResult, body } = require("express-validator");

const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.activity = asyncMiddleware(async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(404).json({ errors: errors.array() });
      return;
    }
    await Activity.create({
      tanggal: req.body.tanggal,
      jenis_kegiatan: req.body.jenis_kegiatan,
      durasi: req.body.durasi,
      keterangan: req.body.keterangan,
      berat_badan: req.body.berat_badan,
    });
    res.status(201).send({
      status: "Activity has been created!",
    });
  } catch (err) {
    return next(err);
  }
});

exports.seeActivity = asyncMiddleware(async (req, res) => {
  const activity = await Activity.findAll({
    attributes: [
      "id",
      "tanggal",
      "jenis_kegiatan",
      "durasi",
      "keterangan",
      "berat_badan",
    ],
    include: [
      {
        model: User,
        attributes: ["username"],
        include: [
          {
            model: Activity,
            attributes: [
              "id",
              "tanggal",
              "jenis_kegiatan",
              "durasi",
              "keterangan",
              "berat_badan",
            ],
          },
        ],
      },
    ],
  });
  res.status(200).json({
    description: "All Acitivty",
    data: activity,
  });
});

exports.findActivityById = asyncMiddleware(async (req, res) => {
  const activity = await Activity.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "tanggal",
      "jenis_kegiatan",
      "durasi",
      "keterangan",
      "berat_badan",
    ],
  });
  res.status(200).json({
    description: "Activity",
    data: activity,
  });
});

exports.updateActivity = asyncMiddleware(async (req, res) => {
  const activity = await Activity.update(
    {
      tanggal: req.body.tanggal,
      jenis_kegiatan: req.body.jenis_kegiatan,
      durasi: req.body.durasi,
      keterangan: req.body.keterangan,
      berat_badan: req.body.berat_badan,
    },
    { where: { id: req.params.id } }
  );
  res.status(200).send({
    reason: "Activity update",
  });
});

exports.deleteActivity = asyncMiddleware(async (req, res) => {
  await Activity.destroy({ where: { id: req.params.id } });
  res.status(200).send({
    reason: "activity has been delete",
  });
});
