const express = require("express");
const cors = require("cors");
const AuthRoutes = require("./routes/auth.routes");

const router = express.Router();

module.exports = async (app) => {
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  app.use(cors());

  app.use("/api/v1/auth", AuthRoutes(router));
};
