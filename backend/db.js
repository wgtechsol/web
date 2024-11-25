const mongoose = require('mongoose');

// MongoDB URI
const URI = 'mongodb://127.0.0.1:27017/Team'; // Replace 'Team' with your actual database name

// Connect to MongoDB
const connectToMongo = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the application if the database connection fails
  }
};

module.exports = { connectToMongo };
