/*const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");*/

const mongoose = require("mongoose");
const Car = require("./model/carModel");

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/location-car", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error('Could not connect to MongoDB', err));

async function createCar() {
  const car = new Car({
    marque: "Toyota",
    model: "Corolla",
    price: 100,
  });
  const result = await car.save();
  console.log(result);
}
createCar();
/*// Create HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathName = parsedUrl.pathname;
  const method = req.method;

  if (pathName === "/api/cars" && method === "GET") {
    // Get all cars
    Car.find()
      .then((cars) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(cars));
      })
      .catch((err) => {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: err.message }));
      });
  } else if (pathName === "/api/cars" && method === "POST") {
    // Create a new car
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const { make, model, year, price } = JSON.parse(body);
      const car = new Car({ make, model, year, price });
      car
        .save()
        .then((newCar) => {
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify(newCar));
        })
        .catch((err) => {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: err.message }));
        });
    });
  } else {
    // Serve static files
    let filePath = path.join(
      __dirname,
      "frontend",
      pathName === "/" ? "home.html" : pathName
    );
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
      ".html": "text/html",
      ".js": "application/javascript",
      ".css": "text/css",
      ".json": "application/json",
      ".png": "image/png",
      ".jpg": "image/jpg",
      ".gif": "image/gif",
      ".svg": "image/svg+xml",
      ".wav": "audio/wav",
      ".mp4": "video/mp4",
      ".woff": "application/font-woff",
      ".ttf": "application/font-ttf",
      ".eot": "application/vnd.ms-fontobject",
      ".otf": "application/font-otf",
      ".wasm": "application/wasm",
    };

    const contentType = mimeTypes[extname] || "application/octet-stream";

    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code == "ENOENT") {
          fs.readFile(
            path.join(__dirname, "frontend", "404.html"),
            (error, content) => {
              res.writeHead(404, { "Content-Type": "text/html" });
              res.end(content, "utf-8");
            }
          );
        } else {
          res.writeHead(500);
          res.end(
            "Sorry, check with the site admin for error: " +
              error.code +
              " ..\n"
          );
        }
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content, "utf-8");
      }
    });
  }
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});*/
