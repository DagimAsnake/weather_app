import mongoose from "mongoose";
import { MONGODB_URI } from "../secret.js";

const dbConnect = () => {
    mongoose.set("strictQuery", false);

    mongoose
        .connect(MONGODB_URI)
        .then(() => {
            console.log("Database connected successfully");
        })
        .catch((err) => {
            console.log("Error while connecting to database");
            console.log(err);
        });
};

export default dbConnect;
