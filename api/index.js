require("dotenv").config();

const express = require("express");
const ConnectDb = require("./config/dbConnection");

const startServer = async () => {
  const app = express();
  await ConnectDb();
  await e;
};
