require("dotenv").config();

const express = require("express");
const ConnectDb = require("./database/dbConnection");
const expressApp = require("./express-app");

const startServer = async () => {
  const app = express();
  await ConnectDb();
  await expressApp(app);

  app
    .listen(3000, () => {
      console.log("listening on port 3000");
    })
    .on("error", (err) => {
      console.log("error", err);
      process.exit(1);
    });
};

startServer();
