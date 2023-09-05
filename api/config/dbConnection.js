const mongoose = require("mongoose");

const ConnectDb = () => {
  mongoose
    .connect(
      "mongodb+srv://rajkumarabothu670:rajkumar%40123@cluster0.xx3rlid.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("connection established db");
    })
    .catch((er) => console.log({ er }));
};
module.exports = ConnectDb;
