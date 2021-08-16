// Default import of express module without Webpack
const express = require("express");
const connectDB = require("./config/db");

// Initialize express application
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// GET
app.get("/", (req, res) => {
  // res.send(smth)
  // res.sendFile(some_file)
  res.json({ msg: "Welcome to the Contact Keeper API" });
});

// Define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

const PORT = process.env.PORT || 5000;

// Listnen method
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
