const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3003;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/location-car", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB..."))
.catch((err) => console.error("Could not connect to MongoDB.", err));

// Define the Schema
const voitureSchema = new mongoose.Schema({
  image: String,
  marque: String,
  model: String,
  places: Number,
});

// Create the Model
const Voiture = mongoose.model("Voiture", voitureSchema);

// Insert sample data only if the collection is empty
async function insertSampleCars() {
  const count = await Voiture.countDocuments();
  if (count === 0) {
    const sampleCars = [
      { image: "images/toyota.jpg", marque: "Toyota", model: "Corolla", places: 5 },
      { image: "images/toyota.jpg", marque: "Honda", model: "Civic", places: 5 },
      { image: "images/toyota.jpg", marque: "Ford", model: "Mustang", places: 4 },
      { image: "images/toyota.jpg", marque: "Tesla", model: "Model S", places: 5 },
      { image: "images/toyota.jpg", marque: "BMW", model: "X5", places: 7 },
      { image: "images/toyota.jpg", marque: "Audi", model: "A4", places: 5 },
      { image: "images/toyota.jpg", marque: "Toyota", model: "Camry", places: 5 },
      { image: "images/toyota.jpg", marque: "Honda", model: "Accord", places: 5 },
      { image: "images/toyota.jpg", marque: "Ford", model: "F-150", places: 3 },
      { image: "images/toyota.jpg", marque: "Tesla", model: "Model 3", places: 5 },
      { image: "images/toyota.jpg", marque: "Mercedes-Benz", model: "C-Class", places: 5 },
      { image: "images/toyota.jpg", marque: "Chevrolet", model: "Malibu", places: 5 },
      { image: "images/toyota.jpg", marque: "Nissan", model: "Altima", places: 5 },
      { image: "images/toyota.jpg", marque: "Hyundai", model: "Elantra", places: 5 },
      { image: "images/toyota.jpg", marque: "Volkswagen", model: "Jetta", places: 5 },
      { image: "images/toyota.jpg", marque: "Kia", model: "Optima", places: 5 },
      { image: "images/toyota.jpg", marque: "Jeep", model: "Grand Cherokee", places: 5 },
      { image: "images/toyota.jpg", marque: "Subaru", model: "Outback", places: 5 },
      { image: "images/toyota.jpg", marque: "Mazda", model: "CX-5", places: 5 },
      { image: "images/toyota.jpg", marque: "Lexus", model: "RX", places: 5 },
    ];

    try {
      await Voiture.insertMany(sampleCars);
      console.log("Sample cars inserted successfully!");
    } catch (err) {
      console.error("Error inserting sample cars:", err);
    }
  }
}

insertSampleCars();

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "explore-cars.html"));
});

app.get("/home.html", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/search.html", (req, res) => {
  res.sendFile(path.join(__dirname, "search.html"));
});

// API route to fetch cars (with optional search query)
app.get("/api/voitures", async (req, res) => {
  const query = req.query.query;
  let filter = {};

  if (query) {
    filter = {
      $or: [
        { marque: { $regex: query, $options: "i" } },
        { model: { $regex: query, $options: "i" } },
      ],
    };
  }

  try {
    const voitures = await Voiture.find(filter);
    res.json(voitures);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cars" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});