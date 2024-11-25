const { connectToMongo } = require("./db.js");
console.log("connected");
connectToMongo();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer"); // Import nodemailer

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Endpoint to handle contact form submissions and send email
app.post("/api/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  // Configure the email transporter
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email provider
    auth: {
      user: "rasekh3457@gmail.com", // Replace with your email
      pass: "bhsf qlkg ksck opmz", // Replace with your email/app password
    },
  });

  const mailOptions = {
    from: email,
    to: "wgtechsol2@gmail.com", // Replace with your recipient email
    subject: `New Contact Form Submission from Portfolio`,
    text: `Info:\n Name: ${name} \n Mail: ${email}\n Request:${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error.message);
    res.status(500).json({ message: "Failed to send email." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
