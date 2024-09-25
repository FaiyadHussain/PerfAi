const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/waqf", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/property", require("./routes/propertyRoutes"));
app.use("/api/task", require("./routes/taskRoutes"));

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
