const mongoose = require("mongoose");

const connectDB = async () => {
  console.log(process.env.MONGO_CONNECTION_URI);
  await mongoose
    .connect(`${process.env.MONGO_CONNECTION_URI}/${process.env.DB_NAME}`)
    .then(() => {
      console.log("Database connected successfully !");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connectDB;
