/**
 * @author spm
 */
const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  });

  mongoose.connection.once("open", () => {
    if (process.env.NODE_ENV === "development") {
      console.log(
        "Connect mongo database successfully: " + process.env.MONGODB_URI
      );
    } else {
      console.log("Connect mongo database successfully");
    }
  });

  mongoose.connection.on("error", (error) => {
    console.log("Mongoose default connection error: " + error);
  });
};
