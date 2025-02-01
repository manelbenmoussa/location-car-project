const express = require("express");
const mongoose = require("mongoose");
const Car = require("./model/carModel");

const app = express();

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/location-car")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

   
// Serve static files from the frontend directory
app.use(express.static("frontend"));

// Endpoint to get all cars or search cars
app.get("/api/cars", async (req, res) => {
  try {
    const searchQuery = req.query.search;
    let cars;
    if (searchQuery) {
      const regex = new RegExp(searchQuery, 'i'); // Case-insensitive search
      cars = await Car.find({ $or: [{ marque: regex }, { model: regex }] });
    } else {
      cars = await Car.find();
    }
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Generate an array of 100 car objects with realistic information
const carBrands = [
  "Toyota",
  "Honda",
  "Ford",
  "Chevrolet",
  "BMW",
  "Mercedes",
  "Audi",
  "Volkswagen",
  "Nissan",
  "Hyundai",
];
const carModels = [
  "Corolla",
  "Civic",
  "Mustang",
  "Camaro",
  "3 Series",
  "C-Class",
  "A4",
  "Golf",
  "Altima",
  "Elantra",
];
const carImages = [
  "images/toyota-corolla.jpg",
  "images/honda-civic.jpg",
  "images/ford-mustang.jpg",
  "images/chevrolet-camaro.jpg",
  "images/bmw-3series.jpg",
  "images/mercedes-cclass.jpg",
  "images/audi-a4.jpg",
  "images/volkswagen-golf.jpg",
  "images/nissan-altima.jpg",
  "images/hyundai-elantra.jpg",
];
const carsToAdd = [];

for (let i = 0; i < 100; i++) {
  const brand = carBrands[Math.floor(Math.random() * carBrands.length)];
  const model = carModels[Math.floor(Math.random() * carModels.length)];
  const price = Math.floor(Math.random() * 100) + 50; // Random price between 50 and 150
  const image = carImages[Math.floor(Math.random() * carImages.length)];

  carsToAdd.push({
    marque: brand,
    model: model,
    price: price,
    image: image,
  });
}

// Function to add cars to the database
async function createCars(cars) {
  for (const carData of cars) {
    const car = new Car(carData);
    const result = await car.save();
    console.log(result);
  }
}

// Call the function to add the cars
createCars(carsToAdd);

// Start the server
const port = 3003; // Changed port number
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
