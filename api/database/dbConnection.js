const mongoose = require("mongoose");
const DB_URL =
  "mongodb+srv://rajkumarabothu670:rajkumar%40123@cluster0.xx3rlid.mongodb.net/";

module.exports = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Db Connected");
  } catch (error) {
    console.log("Error ============");
    console.log(error);
    process.exit(1);
  }
};
