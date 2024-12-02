const express = require("express"); 
const session = require("express-session"); 
const passport = require("passport"); 
const User = require("./models.js"); 
const localStrategy = require("./passport.js"); 
const controllers = require("./controllers.js"); 
const cookieParser = require("cookie-parser"); 
const connectDB = require("./db"); 
const ejs = require("ejs"); 
const bodyParser = require("body-parser"); 
const routes = require("./pages.js"); 
require('dotenv').config();

const apiRoutes = require('./routes/api');
const cors = require('cors');

const app = express();

// Main Server // 
connectDB(); 
app.use( 
	session({ 
		secret: process.env.SESSION_SECRET || 'default_secret',
		resave: false, 
		saveUninitialized: false, 
	}) 
); 

app.use(cors());
app.use(cors({
    origin: "http://localhost:3000",  // React frontend URL
    credentials: true  // Allow cookies to be sent with requests
}));
app.use(express.json());
app.use('/api', apiRoutes);
app.use(cookieParser()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(passport.initialize()); 
app.use(passport.session()); 
app.set("view engine", "ejs"); 

// Serialize and deserialize user objects to maintain user sessions 
passport.serializeUser((user, done) => done(null, user.id)); 
passport.deserializeUser((id, done) => { 
	User.findById(id, (err, user) => done(err, user)); 
}); 
// Use the routes 
app.use("/apiRoutes", controllers);
 // Path to your authentication routes file 
app.use("/", routes); 


const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
