// const express = require('express');
// const router = express.Router();
// const User =require('../models/User')
// const app=express()
// app.use(express.json())

// // Example route
// router.post('/createuser',async (req, res) => {
//     try{
//     // Your logic here
//     console.log(req.body)
//     const user = new User(req.body)
//     await user.save()
//     res.status(201).json(user);
//     res.send(req.body)}
//     catch(error){
//         console.log(error)
//         res.status(500).json({message:"internal server error",error})
//     }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.use(express.json()); // This line should be in your main server file, not here
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rasekh3457@gmail.com", // Your Gmail address
      pass: "bhsf qlkg ksck opmz", // The generated app password
    },
  });
  
// Example route
router.post('/createuser', async (req, res) => {
    try {
        console.log(req.body); // Log the incoming request body
        const user = new User(req.body); // Create a new user instance
        await user.save(); // Attempt to save the user to the database
        return res.status(201).json(user); // Send the created user back in the response
    } catch (error) {
        console.error('Error saving user:', error); // Log the error

        if (error.code === 11000) { // Handle duplicate key error
            return res.status(400).json({ message: "Email already exists" });
        }

        return res.status(500).json({ message: "Internal server error", error: error.message }); // Handle other errors
    }
});

module.exports = router;
