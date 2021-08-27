// Default import of express module without Webpack
const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

// Initialize express application
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// // Deploy didn't work at first because of this initial route
// // GET
// app.get("/", (req, res) => {
//   // res.send(smth)
//   // res.sendFile(some_file)
//   res.json({ msg: "Welcome to the Contact Keeper API" });
// });

// Define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  // Putting it below Defined Routes makes it get anything except those routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

// Listnen method
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
