const mongoose = require("mongoose");
// MongoDb Password "mdy7VTqqDUiYZz8G"
function dbConnection() {
  mongoose.connect(process.env.MONGODBURL).then(() => {
    console.log("Database Connected");
  });
}
module.exports = dbConnection;
