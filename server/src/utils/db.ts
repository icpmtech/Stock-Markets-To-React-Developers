import mongoose from "mongoose";
mongoose.Promise = global.Promise;

require("dotenv").config();

// Read password from dotenv file
const password = process.env.StockTracker_MONGODB_PASSWORD;

const uri  = "mongodb+srv://mouraomartins:hbDNntoEeJQ7bPXQ@cluster0.2mfg6fo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
	console.log("Connected to Database");
});

module.exports = db;
