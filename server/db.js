// db.js 
const mongoose = require("mongoose"); 

// Mongoose Connection 
const connectDB = async () => { 
	mongoose 
		.connect("mongodb://localhost:27017/assingment2", { 
		}) 
		.then(() => console.log("Connected to MongoDB")) 
		.catch((err) => console.error("Error connecting to MongoDB:", err)); 
}; 

module.exports = connectDB;
