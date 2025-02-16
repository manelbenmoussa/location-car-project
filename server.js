const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/location-car",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
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
      {
        image: "images/toyota.jpg",
        marque: "Toyota",
        model: "Corolla",
        places: 5,
      },
      {
        image: "images/toyota.jpg",
        marque: "Honda",
        model: "Civic",
        places: 5,
      },
      {
        image: "images/toyota.jpg",
        marque: "Ford",
        model: "Mustang",
        places: 4,
      },
      {
        image: "images/toyota.jpg",
        marque: "Tesla",
        model: "Model S",
        places: 5,
      },
      { image: "images/toyota.jpg", marque: "BMW", model: "X5", places: 7 },
      { image: "images/toyota.jpg", marque: "Audi", model: "A4", places: 5 },
      {
        image: "images/toyota.jpg",
        marque: "Toyota",
        model: "Camry",
        places: 5,
      },
      {
        image: "images/toyota.jpg",
        marque: "Honda",
        model: "Accord",
        places: 5,
      },
      { image: "images/toyota.jpg", marque: "Ford", model: "F-150", places: 3 },
      {
        image: "images/toyota.jpg",
        marque: "Tesla",
        model: "Model 3",
        places: 5,
      },
      {
        image: "images/toyota.jpg",
        marque: "Mercedes-Benz",
        model: "C-Class",
        places: 5,
      },
      {
        image: "images/toyota.jpg",
        marque: "Chevrolet",
        model: "Malibu",
        places: 5,
      },
      {
        image: "images/toyota.jpg",
        marque: "Nissan",
        model: "Altima",
        places: 5,
      },
      {
        image: "images/toyota.jpg",
        marque: "Hyundai",
        model: "Elantra",
        places: 5,
      },
      {
        image: "images/toyota.jpg",
        marque: "Volkswagen",
        model: "Jetta",
        places: 5,
      },
      { image: "images/toyota.jpg", marque: "Kia", model: "Optima", places: 5 },
      {
        image: "images/toyota.jpg",
        marque: "Jeep",
        model: "Grand Cherokee",
        places: 5,
      },
      {
        image: "images/toyota.jpg",
        marque: "Subaru",
        model: "Outback",
        places: 5,
      },
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
app.get("/model/frontend/home.html", (req, res) => {
  res.sendFile(path.join(__dirname, "/model/frontend/home.html"));
});

app.get("/model/frontend/explore-cars.html", (req, res) => {
  res.sendFile(path.join(__dirname, "/model/frontend/explore-cars.html"));
});

app.get("/model/frontend/search.html", (req, res) => {
  res.sendFile(path.join(__dirname, "/model/frontend/search.html"));
});
app.get("/model/frontend/contact.html", (req, res) => {
  res.sendFile(path.join(__dirname, "/model/frontend/contact.html"));
});
app.get("/model/frontend/contrat.html", (req, res) => {
  res.sendFile(path.join(__dirname, "/model/frontend/contrat.html"));
});
app.get("/model/frontend/payment.html", (req, res) => {
  res.sendFile(path.join(__dirname, "/model/frontend/payment.html"));
});

// API route to fetch cars (with optional search query)
app.get("/api/cars", async (req, res) => {
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
  res.status(500).send("Something broke!");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
