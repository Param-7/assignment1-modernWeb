//controllers.js 
const express = require("express"); 
const router = express.Router(); 
const User = require("./models"); 
const passport = require("passport"); 
const bcrypt = require("bcrypt"); 

// User registration route 
router.post("/register", async (req, res) => {
    const { username, email, password, confirmpassword } = req.body;

    if (!username || !email || !password || !confirmpassword) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (confirmpassword !== password) {
        return res.status(400).json({error: "Passwords do not match" });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ error: "Username already exists" });
        }

        // Hash the password before saving it to the database
        const salt = await bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save the new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        // Respond with success message
        return res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});


// User login route 
router.post(
	"/login",
	passport.authenticate("local", { session: false }),
	(req, res) => {
	  req.session.name = req.body.username;
	  req.session.save();

	  return res.redirect("http://localhost:3000/");
	}
  );

// User logout route
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Could not log out, please try again." });
        }
      
        res.redirect("http://localhost:8000/login"); 
    });
});

module.exports = router; 
